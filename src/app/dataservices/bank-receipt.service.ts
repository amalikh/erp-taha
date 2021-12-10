import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BankReceipt } from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankReceiptService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  
  get(): Observable<BankReceipt[]> {
    return this.http.get<BankReceipt[]>(`${environment.apiUrl}/bank_receipt/`)
  }

  getbyId(voucher_no): Observable<BankReceipt> {
    return this.http.get<BankReceipt>(`${environment.apiUrl}/bank_receipt/${voucher_no}/`)
  }

  Add(bankreceipt:BankReceipt): Observable<BankReceipt> {
    return this.http.post<BankReceipt>(`${environment.apiUrl}/bank_receipt/`,bankreceipt)
  }

  update(bankreceipt:BankReceipt): Observable<BankReceipt> {
    return this.http.put<BankReceipt>(`${environment.apiUrl}/bank_receipt/${bankreceipt.voucher_no}/`,bankreceipt)  
  }

  delete(voucher_no): Observable<BankReceipt> {
    return this.http.delete<BankReceipt>(`${environment.apiUrl}/bank_receipt/${voucher_no}/`);
  }

}
