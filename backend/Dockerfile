FROM node:22-alpine

WORKDIR /app

COPY app-tesi/package*.json ./
RUN npm install

COPY app-tesi .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]