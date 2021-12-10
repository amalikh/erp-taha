import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {  GeneralDT } from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneraldtService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
}


get(typeId:number,parentId:number=0): Observable<GeneralDT[]> {
  return this.http.get<GeneralDT[]>(`${environment.apiUrl}/generaldt/?typeid=${typeId}&parentid=${parentId}/`)
}
Add(generaldt:GeneralDT): Observable<GeneralDT> {
  return this.http.post<GeneralDT>(`${environment.apiUrl}/generaldt/`,generaldt)
}
update(generaldt:GeneralDT): Observable<GeneralDT> {
  return this.http.put<GeneralDT>(`${environment.apiUrl}/generaldt/${generaldt.id}/`,GeneralDT)
}
delete(id): Observable<GeneralDT> {
  return this.http.delete<GeneralDT>(`${environment.apiUrl}/generaldt/${id}/`);
  
}
}
