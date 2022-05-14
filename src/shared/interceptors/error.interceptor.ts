import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, concatMap } from "rxjs/operators";
import { AuthService, NavigationService } from "../services";
import { IS_REFRESH_TOKEN_REQURED } from "./auth.interceptor";

export const IS_API_REQUEST = new HttpContextToken<boolean>(() => false);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    if (req.context.get(IS_API_REQUEST)) return next.handle(req);

    const rt = localStorage.getItem('refresh_token');

    if (req.context.get(IS_REFRESH_TOKEN_REQURED) || !rt) {
      return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.navigationService.toSignIn();
            }
            return throwError(error);
          })
        )
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refresh$()
            .pipe(concatMap(() => next.handle(req)))
        }
        return throwError(error);
      })
    );
  }
}