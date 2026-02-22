import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>('http://localhost:3000/auth/login', credentials);
  }
}
