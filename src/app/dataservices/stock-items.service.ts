import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stockitems } from './models';
@Injectable({
  providedIn: 'root'
})
export class StockitemsService {
  updateStock(stock: stockitems, formvalue: any) {
    throw new Error("Method not implemented.");
  }
  private httpOptions: any;
  private handleError:any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  get(): Observable<stockitems[]> {
    return this.http.get<stockitems[]>(`${environment.apiUrl}/stock-items/`)
  }
  getbyId(id): Observable<stockitems> {
    return this.http.get<stockitems>(`${environment.apiUrl}/stock-items/${id}/`)
  }
  Add(stockitems:stockitems): Observable<stockitems> {
    return this.http.post<stockitems>(`${environment.apiUrl}/stock-items/`,stockitems)
  }
  update(stockitems:stockitems): Observable<stockitems> {
    return this.http.put<stockitems>(`${environment.apiUrl}/stock-items/${stockitems.product}/`,stockitems)
  }
  delete(id): Observable<stockitems> {
    return this.http.delete<stockitems>(`${environment.apiUrl}/stock-items/${id}/`);
  }
}