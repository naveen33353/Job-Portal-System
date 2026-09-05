import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const url = new URL(req.url, window.location.origin).pathname;

    const isPublicPath =
      (req.method === 'GET' && url === '/api/jobs') ||
      (req.method === 'GET' && url === '/api/company') ||
      url === '/api/auth/login' ||
      url === '/api/auth/register' ||
      url === '/api/auth/signup';

    const token = localStorage.getItem('token');

    // Public request / no token
    if (isPublicPath || !token) {
      return next.handle(req);
    }

    // Protected request
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq);
  }
}