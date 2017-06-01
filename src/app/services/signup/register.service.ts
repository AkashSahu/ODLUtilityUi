import { Http } from '@angular/http';
import { User } from './../../core/model/user/user.model';
import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';



@Injectable()
export class RegisterService extends CrudService<User, string>{

  constructor(http: Http) {
    super('http://localhost:8080/auth/registration/', http, null);
  }

}
