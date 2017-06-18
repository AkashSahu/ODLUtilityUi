import { TestserviceService } from './services/testservice/testservice.service';
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
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap';
import { FooterComponent } from './footer/footer.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';



const appRoutes: Routes = [
  { path: 'test', component: AkatestComponent },
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    AkatestComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    AuthenticationModule,
    CarouselModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    MdTabsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RegisterService,TestserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
