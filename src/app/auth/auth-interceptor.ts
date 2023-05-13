import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs";

/**
 * @author Sachin Dilshan
 * @version 1.0.0
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _router: Router) {

  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenReq: HttpRequest<any> = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    });
    return next.handle(tokenReq);
  }

}
