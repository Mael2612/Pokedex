const app = express();

import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import logger from '../src/logger';
import { types } from 'util';
dotenv.config();
const mysql = require('mysql2/promise');

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/pokemon', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pokemons');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});

export const getAllPokemons = async () => {
  const [rows] = await pool.query('SELECT * FROM pokemons');
  return rows;
};

export const getPokemonDetails = async (id: string) => {
  const [rows] = await pool.query('SELECT * FROM pokemons WHERE id = ?', [id]);
  return rows[0];
};


app.get('/pokemon', async (req: Request, res: Response) => { 
  try {
    const [poke] = await pool.query('SELECT * FROM pokemon;');
    res.json(poke);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/pokemon/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const [rows] = await pool.query('SELECT * FROM pokemon WHERE pokemon.id = ?;', [id]);
    const pokemonNames = (rows as { identifier: string }[]).map((row) => row.identifier);
    res.json(pokemonNames);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/pokemon/types', async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const [rows] = await pool.query('SELECT * FROM types;', [types]);
    const poketypes = (rows as { types: string }[]).map((row) => row.types);
    res.json(poketypes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get("/identifier", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT pokemon.identifier FROM pokemon;");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});