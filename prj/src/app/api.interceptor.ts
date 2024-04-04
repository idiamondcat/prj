import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login/login.service';
import { AccountService } from './account.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const apiUrl = 'https://creagive.wn.r.appspot.com';
    // const apiUrl = 'https://test-version-dot-creagive.wn.r.appspot.com';
    const newURL = req.clone({
      url: `${apiUrl}/${req.url}`,
    })
    return next(newURL);
};
