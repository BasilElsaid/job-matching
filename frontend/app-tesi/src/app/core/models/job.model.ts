export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;

  // 🔥 populate restituisce l'utente azienda qui
  companyId?: {
    _id: string;
    companyName?: string;
    email?: string;
    phone?: string;
  };
}
