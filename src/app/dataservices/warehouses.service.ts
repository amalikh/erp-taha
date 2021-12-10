import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Branch, Warehouses } from './models';



@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }


  

  get(): Observable<Warehouses[]> {
    return this.http.get<Warehouses[]>(`${environment.apiUrl}/warehouses/`)
  }
  getbyId(id): Observable<Warehouses> {
    return this.http.get<Warehouses>(`${environment.apiUrl}/warehouses/${id}/`)
  }
  Add(warehouses:Warehouses): Observable<Warehouses> {
    return this.http.post<Warehouses>(`${environment.apiUrl}/warehouses/`,warehouses)
    
  }
  update(warehouses:Warehouses): Observable<Warehouses> {
    return this.http.put<Warehouses>(`${environment.apiUrl}/warehouses/${warehouses.id}/`,warehouses)
    
  }
  delete(id): Observable<Warehouses> {
    return this.http.delete<Warehouses>(`${environment.apiUrl}/warehouses/${id}/`);
    
  }

  getbranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${environment.apiUrl}/branches/`)
  }



}
