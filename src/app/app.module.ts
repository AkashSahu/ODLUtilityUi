import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { MaterialModule, MdTabsModule } from '@angular/material';

import { AuthenticationModule } from './authentication/authentication.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AlertComponent } from './core/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogueboxComponent } from './dialoguebox/dialoguebox.component';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { AkatestComponent } from './akatest/akatest.component';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    AlertComponent,
    DialogueboxComponent,
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
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogueboxComponent]
})
export class AppModule { }
