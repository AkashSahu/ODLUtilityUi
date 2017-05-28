import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AlertComponent } from './core/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    AlertComponent
  ],
  imports: [
    AuthenticationModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
