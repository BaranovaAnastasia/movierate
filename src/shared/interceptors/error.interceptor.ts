import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, concatMap } from "rxjs/operators";
import { AuthService } from "../services";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    const rt = localStorage.getItem('refresh_token');
    
    if (req.url.includes('refresh') || !rt) {
      return next.handle(req)
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