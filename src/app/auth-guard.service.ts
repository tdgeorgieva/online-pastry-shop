import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLoggedIn() || !this.auth.hasPrivilege(route.data.rolesAllowed)) {
      this.router.navigate(['/main-page']);
      return false;
    }
    return true;
  }
}