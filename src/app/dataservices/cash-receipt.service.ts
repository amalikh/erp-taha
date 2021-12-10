import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CashReceipt } from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashReceiptService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  
  get(): Observable<CashReceipt[]> {
    return this.http.get<CashReceipt[]>(`${environment.apiUrl}/cash_receipt/`)
  }
  getbyId(voucher_no): Observable<CashReceipt> {
    return this.http.get<CashReceipt>(`${environment.apiUrl}/cash_receipt/${voucher_no}/`)
  }
  Add(cashreceipt:CashReceipt): Observable<CashReceipt> {
    return this.http.post<CashReceipt>(`${environment.apiUrl}/cash_receipt/`,cashreceipt)
    
  }
  update(cashreceipt:CashReceipt): Observable<CashReceipt> {
    return this.http.put<CashReceipt>(`${environment.apiUrl}/cash_receipt/${cashreceipt.voucher_no}/`,cashreceipt)
    
  }
  delete(voucher_no): Observable<CashReceipt> {
    return this.http.delete<CashReceipt>(`${environment.apiUrl}/cash_receipt/${voucher_no}/`);
  }
}
