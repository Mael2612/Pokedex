import { Request, Response } from 'express';
import { app } from '../src/index'; 

const pool = require('../src/index')

export const getPokemonTypes = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT types FROM pokedex
       JOIN pokemon_types ON pokemon_types.type_id = types.id 
       WHERE pt.pokemon_id = ?`, 
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
