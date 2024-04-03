import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from './login/login.service';

export const authGuard: CanActivateFn = (route, state)  => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const isAuthorized = loginService.isLogin.pipe(
    map((value) => {
      if (value) {
        console.log(value);
        return value;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  );
  return isAuthorized;
};
