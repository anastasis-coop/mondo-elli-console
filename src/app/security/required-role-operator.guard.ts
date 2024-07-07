import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { UserService } from './user.service';

export const RequiredRoleOperatorGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  if (userService.isLoggedIn && userService.isOperator) {
    return true;
  } else {
    console.log('Accesso non autorizzato: rimando alla pagina di login.');
    userService.logout();
    window.location.assign('/auth/login');
    return false;
  }
}
