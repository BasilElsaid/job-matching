export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'COMPANY' | 'USER';

  companyName?: string;
  phone?: string;
  address?: string;
}
