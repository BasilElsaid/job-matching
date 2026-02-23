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

  deleteCompany(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
