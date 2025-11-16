import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'auth_headers';
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post(`${this.api}/auth/sign_in`, { email, password }, { observe: 'response' })
      .pipe(
        map((resp) => {
          const headers = {
            'access-token': resp.headers.get('access-token') || '',
            client: resp.headers.get('client') || '',
            uid: resp.headers.get('uid') || '',
          };
          localStorage.setItem(this.storageKey, JSON.stringify(headers));
          return headers;
        })
      );
  }

  getAuthHeaders() {
    return JSON.parse(localStorage.getItem(this.storageKey) || 'null');
  }

  isLoggedIn() {
    const h = this.getAuthHeaders();
    return !!(h && h['access-token']);
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }
}
