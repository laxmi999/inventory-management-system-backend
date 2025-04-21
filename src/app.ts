import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';

//Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/swagger.yaml'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome!!');
});

app.listen(port, () => {
  console.log(`Server active at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/swagger`);
});
