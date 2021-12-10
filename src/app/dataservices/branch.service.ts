import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Branch } from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class branchService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  get(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${environment.apiUrl}/branches/`)
  }
  getbyId(id): Observable<Branch> {
    return this.http.get<Branch>(`${environment.apiUrl}/branches/${id}/`)
  }
  Add(branch:Branch): Observable<Branch> {
    return this.http.post<Branch>(`${environment.apiUrl}/branches/`,branch)
    
  }
  update(branch:Branch): Observable<Branch> {
    return this.http.put<Branch>(`${environment.apiUrl}/branches/${branch.id}/`,branch)
    
  }
  delete(id): Observable<Branch> {
    return this.http.delete<Branch>(`${environment.apiUrl}/branches/${id}/`);
    
  }
  

}




