FROM node:22-alpine

WORKDIR /app

COPY app-tesi/package*.json ./
RUN npm install

COPY app-tesi .

EXPOSE 4200

CMD ["npm", "start"]