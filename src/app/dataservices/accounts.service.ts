import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Account } from './models';
import { catchError } from 'rxjs/operators';

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
}


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private httpOptions: any;
  private handleError:any
constructor(private http: HttpClient) {
  this.httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' })
  };
}

get(): Observable<Account[]> {
  return this.http.get<Account[]>(`${environment.apiUrl}/accounts/`)
}
getbyId(id): Observable<Account> {
  return this.http.get<Account>(`${environment.apiUrl}/accounts/${id}/`)
}
Add(branch:Account): Observable<Account> {
  return this.http.post<Account>(`${environment.apiUrl}/accounts/`,branch)
  
}
update(account:Account): Observable<Account> {
  return this.http.put<Account>(`${environment.apiUrl}/accounts/${account.id}/`,account)
  
}
delete(id): Observable<Account> {
  return this.http.delete<Account>(`${environment.apiUrl}/accounts/${id}/`);
  
}

}
