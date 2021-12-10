import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Forms } from './models';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  get(): Observable<Forms[]> {
    return this.http.get<Forms[]>(`${environment.apiUrl}/forms/`)
  }

  Add(form:Forms): Observable<Forms> {
    return this.http.post<Forms>(`${environment.apiUrl}/forms/`, form)
  }

  update(form:Forms): Observable<Forms> {
    return this.http.put<Forms>(`${environment.apiUrl}/forms/${form.id}/`, form)
  }

  getbyId(id): Observable<Forms> {
    return this.http.get<Forms>(`${environment.apiUrl}/forms/${id}/`)
  }

  delete(id): Observable<Forms> {
    return this.http.delete<Forms>(`${environment.apiUrl}/forms/${id}/`);
  }
  
}
