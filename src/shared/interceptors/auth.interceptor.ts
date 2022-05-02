import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private static addHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = request.url.includes('refresh')
      ? localStorage.getItem('refresh_token')
      : localStorage.getItem('access_token');
    
    const headers = request.headers.set('Authorization', `Bearer ${token}`);

    return request.clone({ headers });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(AuthInterceptor.addHeader(request));
  }
}
