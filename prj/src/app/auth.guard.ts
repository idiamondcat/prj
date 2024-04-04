import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from './login/login.service';

export const authGuard: CanActivateFn = (route, state): true | UrlTree  => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (loginService.isLogin()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
