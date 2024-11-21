import express, { Express, Request, Response } from "express";
import { getAllPokemons, getPokemonDetails } from '../controllers/controllers';
 
export const router: Express = express();
router.use(express.json());

router.get('/pokemon/:id', async (req: Request, res: Response) => {
  try {
    const pokemon = await getPokemonDetails(req.params.id);
    res.json(pokemon);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

router.get('/pokemons', async (req: Request, res: Response) => {
  try {
    const pokemon = await getPokemonDetails(req.params.id);
    res.json(pokemon);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

export default router;
