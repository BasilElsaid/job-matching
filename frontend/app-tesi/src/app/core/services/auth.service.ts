import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export type UserRole = 'guest' | 'company' | 'admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}
  // 🔥 LEGGIAMO SUBITO DAL LOCALSTORAGE
  private _isAuthenticated = signal<boolean>(
    localStorage.getItem('auth') === 'true',
  );

  private _role = signal<UserRole>(
    (localStorage.getItem('role') as UserRole) || 'guest',
  );

  isAuthenticated = this._isAuthenticated.asReadonly();
  role = this._role.asReadonly();


  loginApi(credentials: { email: string; password: string }) {
    return this.http.post<any>('http://localhost:3000/auth/login', credentials);
  }

  login(response: any, role: UserRole = 'company') {

    console.log("LOGIN SALVATAGGIO TOKEN:", response);

    this._isAuthenticated.set(true);
    this._role.set(role);

    localStorage.setItem('auth', 'true');
    localStorage.setItem('role', role);

    if (response?.access_token) {
      localStorage.setItem('token', response.access_token);
    }
  }

  logout() {
    this._isAuthenticated.set(false);
    this._role.set('guest');

    localStorage.removeItem('auth');
    localStorage.removeItem('role');
  }

  isAdmin() {
    return this._isAuthenticated() && this._role() === 'admin';
  }

  isCompany() {
    return this._isAuthenticated() && this._role() === 'company';
  }
}
