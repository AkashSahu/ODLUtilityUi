import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class TestserviceService {

  constructor(http: Http) {
     this.http = http;
  }

  protected http: Http;

  checkSocial(req) {
    return this.http.post('http://localhost:8080/auth', req)
      .map(res => {
        const data = res.json();
        if (data) {
         console.log(data);
        }
      });
  }

}
