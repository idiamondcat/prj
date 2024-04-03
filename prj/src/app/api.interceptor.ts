import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login/login.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const login = inject(LoginService);
  if (login.isLogin.getValue()) {
    const apiUrl = 'https://creagive.wn.r.appspot.com';
    const newURL = req.clone({
      url: `${apiUrl}/${req.url}`,
    })
    return next(newURL);
  } else {
    return next(req);
  }
};
