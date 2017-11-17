import { CrudOperations } from './../crudoperations.interface';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http'

@Injectable()
export class CountersService {

  constructor(private http: Http) { }

  getMetricsCounters(path :string){
    return this.http.get('http://localhost:8080/fetch/counters?path='+path)
    .map( res => res.json());
  }

}
