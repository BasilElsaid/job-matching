export type JobStatus = 'PENDING' | 'APPROVED';

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: JobStatus;
  referenceLink?: string;

  // 🔥 populate restituisce l'utente azienda qui
  companyId?: {
    _id: string;
    companyName?: string;
    companyEmail?: string;
    companyPhone?: string;
  };
}
