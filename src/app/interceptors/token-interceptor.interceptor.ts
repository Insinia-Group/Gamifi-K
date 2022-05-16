import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { JwtService } from '../services/jwt.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwt: JwtService) { }

  /**
   * Set a Header Authorization to every request if the token exists.
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.jwt.exist()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.jwt.getToken()
        }
      });
    }
    return next.handle(request);
  }
}