import { Headers, RequestOptions } from '@angular/http';
export class createHeader {
    private options() {
        let headers = new Headers({ 'Authorization': '' + localStorage.getItem('token') });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}