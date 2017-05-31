import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { ModalModule } from 'ngx-bootstrap';
import { Authority } from '../core/model/user/authority.enum';
import { User } from '../core/model/user/user.model'

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
  registrationform: FormGroup;
  errorShown: boolean;
  errorMessage: string;
  loginSuccess: string;
  loggedIn: boolean;
  aa: Authority;

  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthenticationService

  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registrationform = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    this.errorShown = false;
    if(this.auth.isLoggedIn()) 
      this.loggedIn = true;
    else
      this.loggedIn = false;
    this.aa.name = "something";
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

  register(value: User) {
    value.authorities = [this.aa];
    value.enabled = true;
    console.log("Register this use " +JSON.stringify(value)+" --- "+value.authorities);
  }

  logout(){
    this.auth.doLogout();
    this.loggedIn=false;
  }
}
