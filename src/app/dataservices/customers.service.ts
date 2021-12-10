import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from './models';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
    private httpOptions: any;
    private handleError:any
  constructor(private http: HttpClient) { 
    this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
  
  }

  get(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customers/`)
  }
  getbyId(id): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/customers/${id}/`)
  }
  Add(customer:Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.apiUrl}/customers/`,customer)
    
  }
  update(customer:Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.apiUrl}/customers/${customer.id}/`,customer)
    
  }
  delete(id): Observable<Customer> {
    return this.http.delete<Customer>(`${environment.apiUrl}/customers/${id}/`);
  }

}
