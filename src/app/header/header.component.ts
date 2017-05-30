import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { ModalModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthenticationService]
})

export class HeaderComponent implements OnInit {
  @ViewChild('authModal') popup;
  redirect: string;
  form: FormGroup;
  errorShown: boolean;
  errorMessage: string;
  loginSuccess: string;
  loggedIn: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthenticationService

  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.errorShown = false;
    if(this.auth.isLoggedIn()) 
      this.loggedIn = true;
    else
      this.loggedIn = false;
  }

  ngOnInit() {
    this.auth.doLogout();
  }

  submit(value: any) {
    this.auth.doLogin(value)
      .subscribe(
        data => {
          console.log(Response),
          this.loggedIn=true;
          this.popup.hide();
          
        },
        error => {
          this.errorMessage = error.json().message;
          this.errorShown = true;
        }
      );
  }

  logout(){
    this.auth.doLogout();
    this.loggedIn=false;
  }
}
