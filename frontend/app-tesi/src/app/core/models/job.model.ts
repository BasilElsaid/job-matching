export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  createdAt: Date;

  companyEmail: string;
  companyPhone: string;
}
