import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

export const app: Express = express();
app.use(express.json());



