import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('helloooooooooo');
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server active at http://localhost:${port}`);
});
