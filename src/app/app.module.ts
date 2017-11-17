import { CountersService } from './services/counters/counters.service';
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
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarouselModule } from 'ngx-bootstrap';
import { FooterComponent } from './footer/footer.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { Ng2CompleterModule } from "ng2-completer";
import {AutoCompleteModule} from 'primeng/primeng';
import { ContentComponent } from './content/content.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';

const appRoutes: Routes = [
  { path: 'counter', component: ContentComponent },
  { path: '',
    redirectTo: '/counter',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    PageNotFoundComponent,
    FooterComponent,
    ContentComponent
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
    RouterModule.forRoot(appRoutes),
    Ng2CompleterModule,
    AutoCompleteModule,
    Ng2TableModule,
    PaginationModule.forRoot()
  ],
  providers: [CountersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
