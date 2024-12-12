import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import db from './models/index.js';
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('hello laxmi');
});

async function connectToDatabase() {
  try {
    await db.sequelize.authenticate();
    // tslint:disable-next-line:no-console
    console.log('success!');
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log('failure: ', error);
  }
}

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server active at http://localhost:${port}`);
  connectToDatabase();
});
