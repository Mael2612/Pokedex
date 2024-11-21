import express, { Request, Response, NextFunction } from 'express';
import mysql from 'mysql2/promise';
const app = express();
const PORT = 8080;

app.use(express.json());


const port = process.env.PORT || 8080;

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection()
  .then((connection) => {
    console.log("Database connected!");
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🌟 Connected on http://localhost:${PORT}`);
});
