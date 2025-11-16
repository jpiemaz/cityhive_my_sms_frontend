import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const headers = auth.getAuthHeaders();

  if (headers) {
    req = req.clone({ setHeaders: headers });
  }

  return next(req);
};
