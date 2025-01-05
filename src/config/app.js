import express from 'express';
import cors from 'cors';
import { errorHandler } from '../middleware/errorHandler.js';
import { notFoundHandler } from '../middleware/notFoundHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

export { app };