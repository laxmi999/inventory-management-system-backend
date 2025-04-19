import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/swagger.yaml'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/ping', (req, res) => {
  res.send('pong!!');
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server active at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/swagger`);
});
