# Platform Aziende – Sistema SPA per la Gestione di Annunci di Lavoro

## Finalità Accademica

Il progetto è stato sviluppato come caso di studio per la tesi triennale in Informatica per analizzare concretamente il funzionamento e i vantaggi dell’architettura SPA.

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
- Implementare controllo accessi basato su ruoli
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
- Autorizzazione per ruoli (ADMIN, COMPANY, GUEST)
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

## Deployment e Accesso Online

Per facilitare la valutazione o la sperimentazione del progetto, la piattaforma è stata resa disponibile su cloud tramite Vercel per il frontend e Render per il backend, con MongoDB Atlas come database remoto.

Frontend (Vercel)

-  Accessibile direttamente al link: https://progetto-tesi-rc1u.vercel.app￼
- SPA Angular già compilata in modalità produzione
- Non è necessario installare o compilare nulla per visualizzare l’app

Backend (Render)

- API REST NestJS ospitate su: https://progetto-tesi-zyo7.onrender.com￼
- Accessibile direttamente dal frontend o via strumenti come Postman
- Autenticazione e autorizzazione funzionano correttamente tramite JWT

Database (MongoDB Atlas)

- Database remoto MongoDB gestito su Atlas
- Collezioni principali già popolate con dati di test
- Nessuna installazione locale richiesta per testare l’app online

Utilizzo senza installazione locale

Se non si desidera installare frontend, backend o database:

	1.	Visitare direttamente il link del frontend su Vercel
	2.	Effettuare login con credenziali di test fornite (o come Guest)
	3.	L’applicazione interagirà automaticamente con il backend su Render e con MongoDB Atlas

Nota per sviluppo locale

Per chi volesse eseguire il progetto in locale, seguire le istruzioni nelle sezioni precedenti (Avvio del Progetto) per frontend, backend e database.


---

# Installazione in Locale
## Prerequisiti

Per eseguire correttamente il progetto, assicurarsi di avere installati i seguenti strumenti:

### Homebrew solo per macOS
Installazione dal sito ufficiale:

https://brew.sh

### Node.js e npm
Installazione:

per macOS:
```bash
brew install node
node -v
npm -v
```

per Windows:
https://nodejs.org/en/download/

### Angular CLI
Installazione:

```bash
npm install -g @angular/cli
ng version
```

### NestJS CLI
Installazione:

```bash
npm install -g @nestjs/cli
nest --version
```

### MongoDB Shell
Installazione:

Per macOS utilizzare Homebrew
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
mongosh
```

Per Windows:

Scaricare MongoDB dal sito ufficiale:
https://www.mongodb.com/try/download/community

Durante l’installazione:
- Selezionare Complete Setup
- Abilitare MongoDB as a Service
	
Verifica da terminale: mongosh

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
cd frontend/app-tesi
npm install
ng serve
```

Frontend disponibile su:

http://localhost:4200

---

### Database

Per eseguire correttamente il progetto è necessario avere MongoDB in esecuzione in locale prima del backend.

da terminale macOS:
```bash
brew services start mongodb-community
mongosh
```

da terminale Windows:
```bash
mongosh
```

---