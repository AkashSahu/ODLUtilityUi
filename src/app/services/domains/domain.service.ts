import { Domain } from './../../core/model/domain.model';
import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { Http } from '@angular/http';

@Injectable()
export class DomainService extends CrudService<Domain, string>{

  constructor(http: Http) { 
     super('http://localhost:8080/public/domainsName', http, null);
  }

  findAll() {
      return this.http.get(this.base)
        .map(this.extractData)
        .catch(this.handleError);
    }

    
}
