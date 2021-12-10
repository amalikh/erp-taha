import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from './models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class productService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products/`)
  }
  getbyId(id): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}/`)
  }
  Add(product:Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products/`,product)
    
  }
  update(product:Product): Observable<Product> {
    console.log(product)
    return this.http.put<Product>(`${environment.apiUrl}/products/${product.id}/`,product)
    
  }
  delete(id): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}/products/${id}/`);
    
  }
  public uploadImages(formData:any) {
    return this.http.post<any>(`${environment.apiUrl}/productimageupload/`, formData);
  }
  

}




