import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase, PurchaseProduct } from './models';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private httpOptions: any;
  private handleError:any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  // Purchase API
  getP(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${environment.apiUrl}/purchases/`)
  }
  getbyIdP(id): Observable<Purchase> {
    return this.http.get<Purchase>(`${environment.apiUrl}/purchases/${id}/`)
  }
  AddP(purchase:Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${environment.apiUrl}/purchases/`,purchase)
  }
  updateP(purchase:Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${environment.apiUrl}/purchases/${purchase.id}/`,purchase)
  }
  deleteP(id): Observable<Purchase> {
    return this.http.delete<Purchase>(`${environment.apiUrl}/purchases/${id}/`);
  }
  updateStatus(purchase:Purchase): Observable<Purchase> {
    return this.http.patch<Purchase>(`${environment.apiUrl}/purchases/${purchase.id}/`, {'status': 'completed'});
  }

  //Purchase Product API
  getPP(): Observable<PurchaseProduct[]> {
    return this.http.get<PurchaseProduct[]>(`${environment.apiUrl}/purchaseproduct/`)
  }
  getbyIdPP(id): Observable<PurchaseProduct> {
    return this.http.get<PurchaseProduct>(`${environment.apiUrl}/purchaseproduct/${id}/`)
  }
  AddPP(purchaseP:PurchaseProduct): Observable<PurchaseProduct> {
    console.log(purchaseP)
    return this.http.post<PurchaseProduct>(`${environment.apiUrl}/purchaseproduct/`,purchaseP)
  }
  updatePP(purchaseP:PurchaseProduct): Observable<PurchaseProduct> {
    return this.http.put<PurchaseProduct>(`${environment.apiUrl}/purchaseproduct/${purchaseP.id}/`,purchaseP)
  }
  deletePP(id): Observable<PurchaseProduct> {
    return this.http.delete<PurchaseProduct>(`${environment.apiUrl}/purchaseproduct/${id}/`);
  }
}
