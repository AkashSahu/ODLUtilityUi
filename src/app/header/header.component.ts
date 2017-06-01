import { RegisterService } from './../services/signup/register.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { ModalModule } from 'ngx-bootstrap';
import { Authority } from '../core/model/user/authority.enum';
import { User } from '../core/model/user/user.model';

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

  constructor(
    private registerService: RegisterService,
    public formBuilder: FormBuilder,
    public auth: AuthenticationService

  ) {
    this.form = formBuilder.group(this.initLoginFormModel());

    this.registrationform = formBuilder.group(this.initRegistrationFormModel());

    this.errorShown = false;
    if (this.auth.isLoggedIn())
      this.loggedIn = true;
    else
      this.loggedIn = false;
  }

  ngOnInit() {
    this.auth.doLogout();
    this.subscribeRegistrationFormChanges();
  }

  submit(value: any) {
    this.auth.doLogin(value)
      .subscribe(
      data => {
        console.log(Response);
        this.loggedIn = true;
        this.popup.hide();

      },
      error => {
        this.errorMessage = error.json().message;
        this.errorShown = true;
      }
      );
  }

  register(value: User) {
    value.enabled = true;
    var auth: Authority = new Authority();
    auth.name = "ROLE_ADMIN";
    value.authorities = [auth];
    this.registerService.save(value)
      .subscribe(
      data => {
        console.log(data),
          this.popup.hide();
      },
      error => {
        console.log("error saving component");
        this.errorMessage = error.json().message;
        this.errorShown = true;
        console.log(this.errorMessage);
      }
      );

  }

  logout() {
    this.auth.doLogout();
    this.loggedIn = false;
  }

  subscribeRegistrationFormChanges() {
    Object.keys(this.registrationform.controls).forEach(key => {
      this.registrationform.controls[key].setValidators(this.initRegistrationFormModel()[key][1]);
      this.registrationform.controls[key].updateValueAndValidity();
    });
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValidators(this.initLoginFormModel()[key][1]);
      this.form.controls[key].updateValueAndValidity();
    });
  }

  initRegistrationFormModel() {
    const phoneRegex = /^[789]\d{9}$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const model = {
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneRegex)]]
    };

    return model;
  }

  initLoginFormModel() {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const model = {
      username: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', Validators.required]
    };

    return model;
  }
}
