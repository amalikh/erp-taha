import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories} from './models';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private httpOptions: any;
  private handleError:any
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  get(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${environment.apiUrl}/categories/`)
  }
  getbyId(id): Observable<Categories> {
    return this.http.get<Categories>(`${environment.apiUrl}/categories/${id}/`)
  }
  Add(categories:Categories): Observable<Categories> {
    console.log(categories);
    return this.http.post<Categories>(`${environment.apiUrl}/categories/`,categories)
    
  }
  update(categories:Categories): Observable<Categories> {
    return this.http.put<Categories>(`${environment.apiUrl}/categories/${categories.id}/`,categories)
  }
  delete(id): Observable<Categories> {
    return this.http.delete<Categories>(`${environment.apiUrl}/categories/${id}/`);
    
  }
  

}




