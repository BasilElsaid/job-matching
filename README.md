# Platform Aziende – Sistema SPA per la Gestione di Annunci di Lavoro

## Descrizione

Applicazione web sviluppata come caso di studio per l’analisi dell’architettura **Single Page Application (SPA)**.

La piattaforma permette alle aziende di pubblicare annunci di lavoro e agli studenti di consultarli.

Tecnologie utilizzate:

- **Frontend:** Angular + Angular Material  
- **Backend:** NestJS  
- **Database:** MongoDB  

---

## Obiettivi

- Implementare un sistema SPA completo
- Integrare frontend e backend tramite API REST
- Gestire autenticazione con JWT
- Implementare controllo accessi basato su ruoli (RBAC)
- Realizzare operazioni CRUD su aziende e annunci

---

## Architettura

Il progetto segue un’architettura **client-server separata**.

### Frontend
- Angular
- Routing lato client
- Reactive Forms
- HTTP Client
- Protezione rotte con Auth Guard

### Backend
- NestJS
- API REST
- Autenticazione JWT
- Autorizzazione per ruoli (ADMIN, COMPANY, STUDENT)
- Validazione DTO
- Mongoose per MongoDB

### Database
- MongoDB
- Collezioni principali:
  - Users
  - Jobs

---

## Sistema Ruoli

### Admin
- Visualizza aziende
- Approva o elimina annunci
- Elimina aziende

### Azienda
- Gestisce il proprio profilo
- Crea ed elimina annunci
- Visualizza stato annunci (PENDING / APPROVED)

### Guest/Studente
- Visualizza annunci approvati

---

## Avvio del Progetto

### Backend

```bash
cd backend/app-tesi
npm install
npm run start:dev
```

Backend disponibile su:

http://localhost:3000

---

### Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend disponibile su:

http://localhost:4200

---

## Finalità Accademica

Il progetto è stato sviluppato come caso di studio per la tesi triennale in Informatica per analizzare concretamente il funzionamento e i vantaggi dell’architettura SPA rispetto a una MPA tradizionale.