import { Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export interface CrudOperations<T, ID> {
	save(t: T): Observable<T>;
	save(t: T,options: RequestOptions): Observable<T>;
	update(t: T): Observable<T>;
	findOne(id: ID): Observable<T>;
	findAll(): Observable<T[]>;
	delete(id: ID): Observable<T>;
}