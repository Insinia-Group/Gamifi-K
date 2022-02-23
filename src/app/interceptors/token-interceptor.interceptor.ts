import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {JwtService} from '../services/jwt.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public jwt: JwtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    request = request.clone({
      setHeaders: {
        Authorization: this.jwt.getToken()
      }
    });

    return next.handle(request);
  }
}