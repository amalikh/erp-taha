import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductAttribute, ProductAttributeVal} from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AttributeService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  get(): Observable<ProductAttribute[]> {
    return this.http.get<ProductAttribute[]>(`${environment.apiUrl}/attributes/`)
  }
  getbyId(id): Observable<ProductAttribute> {
    return this.http.get<ProductAttribute>(`${environment.apiUrl}/attributes/${id}/`)
  }
  Add(attribute:ProductAttribute): Observable<ProductAttribute> {
    return this.http.post<ProductAttribute>(`${environment.apiUrl}/attributes/`,attribute)
    
  }
  update(attribute:ProductAttribute): Observable<ProductAttribute> {
    return this.http.put<ProductAttribute>(`${environment.apiUrl}/attributes/${attribute.id}/`,attribute)
    
  }
  delete(id): Observable<ProductAttribute> {
    return this.http.delete<ProductAttribute>(`${environment.apiUrl}/attributes/${id}/`);
    
  }

  getvalue(): Observable<ProductAttributeVal[]> {
    return this.http.get<ProductAttributeVal[]>(`${environment.apiUrl}/attributesval/`)
  }
  getbyIdvalue(id): Observable<ProductAttributeVal> {
    return this.http.get<ProductAttributeVal>(`${environment.apiUrl}/attributesval/${id}/`)
  }

  addValue(attribute:ProductAttributeVal): Observable<ProductAttributeVal> {
    return this.http.post<ProductAttributeVal>(`${environment.apiUrl}/attributesval/`,attribute)
    
  }
  updatevalue(attribute:ProductAttributeVal): Observable<ProductAttributeVal> {
    return this.http.put<ProductAttributeVal>(`${environment.apiUrl}/attributesval/${attribute.id}/`,attribute)
    
  }
  deletevalue(id): Observable<ProductAttributeVal> {
    return this.http.delete<ProductAttributeVal>(`${environment.apiUrl}/attributesval/${id}/`);
    
  }
  

}




