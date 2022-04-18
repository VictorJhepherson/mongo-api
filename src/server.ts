import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import Database from './database/database';

const mongoURL = process.env.MONGO_URL;
const port = process.env.PORT || 4000;
const server = http.createServer(app);

(async function initialize() {
  const connection = await Database.getConnection(mongoURL);

  if (connection) {
    server.listen(port, () => {
      console.log(`Servidor está rodando na porta: ${port}`);
    });
  } else {
    console.log(`Falha ao conectar no host: ${mongoURL}`);
  }
})();
