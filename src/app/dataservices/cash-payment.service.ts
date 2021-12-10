import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CashPayment } from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashPaymentService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  
  get(): Observable<CashPayment[]> {
    return this.http.get<CashPayment[]>(`${environment.apiUrl}/cash_payment/`)
  }
  getbyId(voucher_no): Observable<CashPayment> {
    return this.http.get<CashPayment>(`${environment.apiUrl}/cash_payment/${voucher_no}/`)
  }
  Add(cashpayment:CashPayment): Observable<CashPayment> {
    return this.http.post<CashPayment>(`${environment.apiUrl}/cash_payment/`,cashpayment)
    
  }
  update(cashpayment:CashPayment): Observable<CashPayment> {
    return this.http.put<CashPayment>(`${environment.apiUrl}/cash_payment/${cashpayment.voucher_no}/`,cashpayment)
    
  }
  delete(voucher_no): Observable<CashPayment> {
    return this.http.delete<CashPayment>(`${environment.apiUrl}/cash_payment/${voucher_no}/`);
  }
}
