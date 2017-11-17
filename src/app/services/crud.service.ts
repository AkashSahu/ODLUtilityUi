import { CrudOperations } from './crudoperations.interface';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class CrudService<T, ID> implements CrudOperations<T, ID> {

  protected base: string;
  protected http: Http;
  protected optionalHeader: RequestOptions;

  constructor(base: string, http: Http, requestOption: RequestOptions) {
    this.base = base;
    this.http = http;
    this.optionalHeader = requestOption;
  }

  save(t: T) {
    if (RequestOptions == null) {
      return this.http.post(this.base, t)
        .map(this.extractData)
        .catch(this.handleError);
    }
    return this.http.post(this.base, t, this.optionalHeader)
      .map(this.extractData)
      .catch(this.handleError);
  }

  update(t: T) {
    if (RequestOptions == null) {
      return this.http.put(this.base, t)
        .map(this.extractData)
        .catch(this.handleError);
    }
    return this.http.put(this.base, t, this.optionalHeader)
      .map(this.extractData)
      .catch(this.handleError);
  }

  findOne(id: ID) {
    if (RequestOptions == null) {
      return this.http.get(this.base + "/" + id)
        .map(this.extractData)
        .catch(this.handleError);
    }
    return this.http.get(this.base + "/" + id, this.optionalHeader)
      .map(this.extractData)
      .catch(this.handleError);
  }

  findAll() {
    if (RequestOptions == null) {
      return this.http.get(this.base)
        .map(this.extractData)
        .catch(this.handleError);
    }
    return this.http.get(this.base, this.optionalHeader)
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(id: ID) {
    if (RequestOptions == null) {
      return this.http.delete(this.base + '/' + id)
        .map(this.extractData)
        .catch(this.handleError);
    }
    return this.http.delete(this.base + '/' + id, this.optionalHeader)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected extractData(res: Response) {
    console.log("Extracting data");
    //let body = res.json() || '';
    //return<string[]>res.json();
    return res.json()  || '';
    //return res;
  }

  protected handleError(error: Response | any) {
    let msg: string;
    if (error instanceof Response) {
      msg = error.json() || '';
    } else {
      msg = error.message ? error.message : error.toString();
    }
    console.log("handling error"+msg);
    return Observable.throw(msg);
  }

}