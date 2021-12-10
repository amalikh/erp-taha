import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductUOM} from './models';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UomService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }



  get(): Observable<ProductUOM[]> {
    return this.http.get<ProductUOM[]>(`${environment.apiUrl}/uom/`)
  }
  getbyId(id): Observable<ProductUOM> {
    return this.http.get<ProductUOM>(`${environment.apiUrl}/uom/${id}/`)
  }
  Add(attribute:ProductUOM): Observable<ProductUOM> {
    return this.http.post<ProductUOM>(`${environment.apiUrl}/uom/`,attribute)
    
  }
  update(attribute:ProductUOM): Observable<ProductUOM> {
    return this.http.put<ProductUOM>(`${environment.apiUrl}/uom/${attribute.id}/`,attribute)
    
  }
  delete(id): Observable<ProductUOM> {
    return this.http.delete<ProductUOM>(`${environment.apiUrl}/uom/${id}/`);
    
  }


}
