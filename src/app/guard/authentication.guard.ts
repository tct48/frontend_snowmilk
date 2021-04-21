import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppURL } from '../app.url';
import { AlertService } from '../share/alert.service';
import { AuthenService } from '../share/service/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authen.getAuthenticated())
      return true;

    this.alert.notify("กรุณาล๊อกอินเข้าสู่ระบบก่อน!");
    this.router.navigate(['/', AppURL.Signin, { returnURL: state.url }]);
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(route: Route, setments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
