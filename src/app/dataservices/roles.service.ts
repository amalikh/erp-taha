import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Roles } from './models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  @Input() currentUserRoles = null;

  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  get(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${environment.apiUrl}/roles/`)
  }

  Add(role:Roles): Observable<Roles> {
    return this.http.post<Roles>(`${environment.apiUrl}/roles/`, role)
  }

  update(role:Roles): Observable<Roles> {
    return this.http.put<Roles>(`${environment.apiUrl}/roles/${role.id}/`, role)
    
  }

  getbyId(id): Observable<Roles> {
    return this.http.get<Roles>(`${environment.apiUrl}/roles/${id}/`)
  }

  delete(id): Observable<Roles> {
    return this.http.delete<Roles>(`${environment.apiUrl}/roles/${id}/`);
    
  }
  
}
