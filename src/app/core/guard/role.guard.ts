import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, UrlSegment, Route, CanActivateChild, CanDeactivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Roles } from 'src/app/dataservices/models';
import { RolesService } from 'src/app/dataservices/roles.service';
import { UserService } from 'src/app/dataservices/user.service';
import { BaseComponent } from 'src/app/views/layout/base/base.component';
import { AuthService } from './auth-service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }

@Injectable()
export class RoleGuard implements CanActivate {

  // roles: Roles[] = null;
  role = null;
  
  constructor(private router: Router, private app: AppComponent, private authenticationService: UserService, private _roleService: RolesService, private base: BaseComponent) {
  
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('User Roles: ----', this._roleService.currentUserRoles)
    this.base.data_loaded = true
    // console.log(this._roleService.currentUserRoles)
    this.app.user_role.subscribe(value => {
      // console.log("Subscription got", value);
      console.log('sidebar role:', value);
      this.role = value
      if (this.role == 'Admin') {
        // logged in so return true
        return true;
    }
    });

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/dashboard']);
    return false;
  }
}