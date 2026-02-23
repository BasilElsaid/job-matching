export type UserRole = 'ADMIN' | 'COMPANY' | 'USER';

export interface User {
  _id: string;

  email: string;
  role: UserRole;
  password?: string;

  // 👇 Campi azienda
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
