import express from 'express';
import cors from 'cors';
import { getAddress } from './controllers/getAddress.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/address', getAddress);

export default app;
