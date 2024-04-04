import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const apiUrl = 'https://test-version-dot-creagive.wn.r.appspot.com';
    const newURL = req.clone({
      url: `${apiUrl}/${req.url}`,
      withCredentials: true
    })
    return next(newURL);
};
