import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { AuthenticationService } from './authentication.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
    headerPrefix: ''
  }), http, options);
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthenticationService, 
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions],
    },

  ]
})
export class AuthenticationModule { }
