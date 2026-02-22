import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  getCompanies() {
    const data = localStorage.getItem('companyData');

    if (!data) return [];

    return [JSON.parse(data)];
  }

  deleteCompany() {
    localStorage.removeItem('companyData');
  }
}
