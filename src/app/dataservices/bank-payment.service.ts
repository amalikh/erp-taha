import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BankPayment } from './models';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BankPaymentService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  
  get(): Observable<BankPayment[]> {
    return this.http.get<BankPayment[]>(`${environment.apiUrl}/bank_payment/`)
  }
  getbyId(voucher_no): Observable<BankPayment> {
    return this.http.get<BankPayment>(`${environment.apiUrl}/bank_payment/${voucher_no}/`)
  }
  Add(bankpayment:BankPayment): Observable<BankPayment> {
    return this.http.post<BankPayment>(`${environment.apiUrl}/bank_payment/`,bankpayment)
    
  }
  update(bankpayment:BankPayment): Observable<BankPayment> {
    return this.http.put<BankPayment>(`${environment.apiUrl}/bank_payment/${bankpayment.voucher_no}/`,bankpayment)
    
  }
  delete(voucher_no): Observable<BankPayment> {
    return this.http.delete<BankPayment>(`${environment.apiUrl}/bank_payment/${voucher_no}/`);
    
  }
  
  }
  