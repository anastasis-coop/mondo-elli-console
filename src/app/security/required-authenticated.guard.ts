import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from './user.service';

export const RequiredAuthenticatedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isLoggedIn) {
    return true;
  } else {
    console.log('Accesso non autorizzato: rimando alla pagina di login.');
    userService.logout();
    router.navigate(['auth/login']);
    // router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
