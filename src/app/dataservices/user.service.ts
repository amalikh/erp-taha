import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../views/auth/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { userObj } from './models';

@Injectable({
  providedIn: 'root'
})

export class UserService {
//  userObj:userObj;
  // user_role: User[] = null;
  user_data;
  user_token: string;
  public formValue: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient, private user: User) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' })
    };
  }

  // Get Current User
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  // setUserObj(userobj:userObj){
  //   this.userObj = userobj;
  // }
  // getUserobj():userObj
  // {
  //   return this.userObj;
  // }

  // getUserRole(usernameid){
  //   this.authenticationService.get().subscribe(data=>{
  //     this.users = data;
  //     // console.log('All Users: ', this.users)
  //     var roles = [];
  //     for (let user of this.users) {
  //       console.log('user:', user); 
  //       roles.push(user['role_name']);
  //       // console.log(roles)
  //       // this.roles.currentUserRoles = user.role_name
  //       // console.log('List of roles:', roles)
  //     }
  //     // console.log('List of roles:', roles)
  //     this.roles.currentUserRoles = roles
  //     console.log('Current User Roles:', this.roles.currentUserRoles)
  //     this.base.data_loaded = true;
  //   })
  // }

  getUser(value){
    return value
  }
  
  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  login(user) {
    return this.http.post(`${environment.apiUrl}/api-token-auth/`, user, this.httpOptions)
  }
  // register(user) {
  //   return this.http.post(`${environment.apiUrl}/api-token-auth/`, user, this.httpOptions)
  // }
  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(`${environment.apiUrl}/api-token-refresh/`, JSON.stringify({ token: this.token }), this.httpOptions).subscribe(
      data => {
        this.user = this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
    return this.user
  }

  public logout() {
    this.user = null;
    this.token = null;
    this.token_expires = null;
    this.username = null;
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
    console.trace(this.currentUserSubject.value);
    console.trace("logout");
  }

  updateData(token) {
    console.log(token)
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    this.user.token = this.token;
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    console.log(token_decoded)
    this.user.username = token_decoded.username;
    this.user.email = token_decoded.email;
    
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.currentUserSubject.next(this.user);
    return this.user;
    // output:
    // {
    //   "orig_iat": 1528071221,
    //   "exp": 1528074821,
    //   "username": "user1",
    //   "email": "user1@example.com",
    //   "user_id": 2
    // }
  }

  Add(user:User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/register/`, user)
  }

  update(user:User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/register/${user.id}/`, user)
    
  }

  get(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/`)
  }

  getbyId(id): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}/`)
  }

  delete(id): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/register/${id}/`);
    
  }

  // registerUser(userData): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/register/`, userData)
    
  // }

  IsAuthenticated() {
    let exp = this.token_expires;
    let now = new Date();
    if (exp > now) {
      return false
    }
    return true

  }







}