import express from 'express';
import cors from 'cors';
import { getAddress } from './controllers/getAddress.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocs = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //http://localhost:4000/api-docs/

app.post('/address', getAddress);

export default app;
