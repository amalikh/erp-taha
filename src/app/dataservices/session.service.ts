import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sessions } from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  get(): Observable<Sessions[]> {
    return this.http.get<Sessions[]>(`${environment.apiUrl}/sessions/`)
  }
  getbyId(id): Observable<Sessions> {
    return this.http.get<Sessions>(`${environment.apiUrl}/sessions/${id}/`)
  }
  Add(session:Sessions): Observable<Sessions> {
    return this.http.post<Sessions>(`${environment.apiUrl}/sessions/`,session)
    
  }
  update(session:Sessions): Observable<Sessions> {
    return this.http.put<Sessions>(`${environment.apiUrl}/sessions/${session.id}/`,session)
    
  }
  delete(id): Observable<Sessions> {
    return this.http.delete<Sessions>(`${environment.apiUrl}/sessions/${id}/`);
    
  }
  

}




