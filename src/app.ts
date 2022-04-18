import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoutes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setupExpress();
    this.setupRoutes();
  }

  private setupExpress(): void {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.app.use('/users', userRoutes);
  }
}

export default new App().app;
