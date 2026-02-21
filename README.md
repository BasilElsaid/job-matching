# Platform Aziende – Sistema SPA per la Gestione di Annunci di Lavoro

## 📌 Descrizione del Progetto

Questo progetto rappresenta un'applicazione web sviluppata come caso di studio per il confronto tra architetture **Single Page Application (SPA)** e **Multi Page Application (MPA)**.

L'applicazione è stata realizzata concretamente seguendo il paradigma SPA utilizzando:

- Angular (Frontend)
- NestJS (Backend)
- MongoDB (Database)

Il sistema funziona come piattaforma di intermediazione tra aziende e studenti, permettendo la pubblicazione e la consultazione di annunci di lavoro.

---

## 🎯 Obiettivo

L'obiettivo del progetto è:

- Analizzare concretamente l'architettura SPA
- Implementare un sistema reale con autenticazione e gestione ruoli
- Mostrare operazioni CRUD su entità aziendali e annunci
- Integrare frontend e backend tramite API REST
- Utilizzare un database NoSQL per la persistenza dei dati

---

## 🏗 Architettura

Il progetto segue un'architettura **client-server separata**:

### Frontend
- Angular
- Angular Material
- Routing lato client
- Comunicazione con API REST tramite HTTP
- Gestione autenticazione con JWT

### Backend
- NestJS
- API REST
- Autenticazione con JWT
- Autorizzazione basata su ruoli
- Validazione dati
- Integrazione con MongoDB tramite ODM (Mongoose)

### Database
- MongoDB
- Persistenza di:
  - Aziende
  - Utenti
  - Annunci
  - Ruoli

---

## 🚀 Come Avviare il Progetto

### 1️⃣ Backend

```bash
cd backend/app-tesi
npm install
npm run start:dev