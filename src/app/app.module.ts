import { RegisterService } from './services/signup/register.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { MaterialModule, MdTabsModule } from '@angular/material';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './core/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { AkatestComponent } from './akatest/akatest.component';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    AkatestComponent
  ],
  imports: [
    AuthenticationModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    MdTabsModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
