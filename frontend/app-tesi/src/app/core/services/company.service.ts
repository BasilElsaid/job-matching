import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?role=COMPANY`);
  }

  getMe(): Observable<User> {
    const token = localStorage.getItem('token');

    return this.http.get<User>('http://localhost:3000/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCompany(id: string) {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteMe() {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateMe(data: any) {
    const token = localStorage.getItem('token');

    return this.http.patch<User>('http://localhost:3000/users/me', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  approveProfile(id: string) {
    return this.http.patch(
      `http://localhost:3000/users/${id}/approve-profile`,
      {},
      this.authHeader(),
    );
  }

  rejectProfile(id: string) {
    return this.http.patch(
      `http://localhost:3000/users/${id}/reject-profile`,
      {},
      this.authHeader(),
    );
  }

  private authHeader() {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
