export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'COMPANY' | 'USER';

  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
}
