import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // 🔥 backend

  constructor(private http: HttpClient) {}

  // ================= USERS =================

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // ================= JOBS =================

  getJobs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jobs`);
  }

  createJob(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/jobs`, data);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/jobs/${id}`);
  }
}