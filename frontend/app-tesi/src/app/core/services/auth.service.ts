import { Injectable, signal } from '@angular/core';

export type UserRole = 'guest' | 'company' | 'admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // 🔥 LEGGIAMO SUBITO DAL LOCALSTORAGE
  private _isAuthenticated = signal<boolean>(
    localStorage.getItem('auth') === 'true',
  );

  private _role = signal<UserRole>(
    (localStorage.getItem('role') as UserRole) || 'guest',
  );

  isAuthenticated = this._isAuthenticated.asReadonly();
  role = this._role.asReadonly();

  login(role: UserRole = 'company') {
    this._isAuthenticated.set(true);
    this._role.set(role);

    localStorage.setItem('auth', 'true');
    localStorage.setItem('role', role);
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
