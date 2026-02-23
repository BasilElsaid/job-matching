import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export type UserRole = 'guest' | 'COMPANY' | 'ADMIN';

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

  login(response: any) {
    console.log('LOGIN SALVATAGGIO TOKEN:', response);

    if (!response?.access_token) return;

    const token = response.access_token;

    // 🔥 Decodifica il token per leggere il ruolo reale
    const payload = JSON.parse(atob(token.split('.')[1]));

    const role = payload.role as UserRole;

    this._isAuthenticated.set(true);
    this._role.set(role);

    localStorage.setItem('auth', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
  }

  logout() {
    this._isAuthenticated.set(false);
    this._role.set('guest');

    localStorage.removeItem('auth');
    localStorage.removeItem('role');
  }

  register(data: any) {
    return this.http.post<any>('http://localhost:3000/users', data);
  }

  isAdmin() {
    return this._isAuthenticated() && this._role() === 'ADMIN';
  }

  isCompany() {
    return this._isAuthenticated() && this._role() === 'COMPANY';
  }
}
