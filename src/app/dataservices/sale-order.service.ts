import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sale } from './models';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {
  private httpOptions: any;
  private handleError: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })


    };
  }

  // Sale API
  get(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${environment.apiUrl}/sales/`)
  }
  getbyId(id): Observable<Sale> {
    return this.http.get<Sale>(`${environment.apiUrl}/sales/${id}/`)
  }
  Add(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${environment.apiUrl}/sales/`, sale)
  }
  update(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${environment.apiUrl}/sales/${sale.id}/`, sale)
  }
  delete(id): Observable<Sale> {
    return this.http.delete<Sale>(`${environment.apiUrl}/sales/${id}/`);
  }

}