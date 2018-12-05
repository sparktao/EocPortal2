import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { OpenIdConnectService } from './open-id-connect.service';
import { Observable } from 'rxjs';
  // we declare that this service should be created
  // by the root application injector.
@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

    constructor(private openIdConnectService: OpenIdConnectService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        // add the access token as bearer token

        if (this.openIdConnectService.userAvailable) {
            request = request.clone(
                {
                    setHeaders: {
                        Authorization: `${this.openIdConnectService.user.token_type} ${this.openIdConnectService.user.access_token}`
                    }
                });
        }
        return next.handle(request);
    }
}
