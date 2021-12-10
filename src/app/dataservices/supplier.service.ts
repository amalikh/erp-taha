import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from './models';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }



  get(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${environment.apiUrl}/suppliers/`)
  }
  getbyId(id): Observable<Supplier> {
    return this.http.get<Supplier>(`${environment.apiUrl}/suppliers/${id}/`)
  }
  Add(supplier:Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${environment.apiUrl}/suppliers/`,supplier)
    
  }
  update(supplier:Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${environment.apiUrl}/suppliers/${supplier.id}/`,supplier)
    
  }
  delete(id): Observable<Supplier> {
    return this.http.delete<Supplier>(`${environment.apiUrl}/suppliers/${id}/`);
  }
}