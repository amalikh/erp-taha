import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../dataservices/user.service';
import { User } from '../user';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { userObj } from 'src/app/dataservices/models';
import { MatSnackBar, } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  loginForm: FormGroup;
  user: User;
  submitted = false;
  errors;
  swl;
  user_data = 'null';
  user_token: string = 'null';
  // userObj:userObj;


  constructor(private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private formbuilder: FormBuilder, private _userService: UserService) {


  }

  ngOnInit(): void {
    //this.userObj = this._userService.getUserobj();

    // this.route
    //   .paramMap
    //   .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     this.userObj.username = params['username'] || 0;
    //   });
    //   console.log(this.userObj)
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.formbuilder.group({
      // username: [this.userObj.username, Validators.required],
      // password: [this.userObj.password, Validators.required]
      // username: [this._userService.formValue.username, Validators.required],
      // password: [this._userService.formValue.password, Validators.required]
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(f) {

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.errors = "Please fill the details";
      return;
    }
    if (f.username == 'admin' && f.password == '5cube') {
      let obj = {
        email: "admin@gmail.com",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjM5MDUzMDc4LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjM5MDQ5NDc4fQ.c6tS79N1btikd3bZG_m62PfslJ4keGGEwuEVfJPf-g0",
        username: "admin"
      }
      localStorage.setItem('currentUser', JSON.stringify(obj));
      localStorage.setItem('isLoggedin', 'true');
      location.replace('/dashboard')
    }
    else {
      this.errors = "Invalid Credentials";
    }

    return
    try {
      this.refreshToken()
      this._userService.login({ 'username': f.username, 'password': f.password }).subscribe((user: any) => {
        console.log('User:', user)
        if (user.token)
          this.user = this._userService.updateData(user.token);
        // this.user_data = this.user
        // this.user_token = this._userService.currentUserValue.token
        // console.log(this.user_data)
        // console.log(this.user_token)
        this.user_data = user
        this.user_token = this._userService.currentUserValue.token
        console.log('User Data:', this.user_data)
        console.log('User Token:', this.user_token)


        if (this._userService.currentUserValue.token) {
          localStorage.setItem('isLoggedin', 'true');
          location.replace('/dashboard')
        }
      },
        err => {
          this.errors = err['error']["non_field_errors"][0];
        }

      );


    }
    catch (error) {
      console.log(error)
      this.errors = error;

    }
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
    localStorage.setItem('isLoggedin', 'false');
    this.router.navigate(['/auth/login']);
    // location.reload()
    // location.replace('/auth/login')
    // this.refreshToken()
  }
}