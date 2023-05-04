import express from 'express';
import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

function loadRecipeData() {
  return JSON.parse(fs.readFileSync('./data/recipes.json', 'utf8'));
}

router.get('/', (_req, res) => {
  res.json(loadRecipeData());
});

router.get('/random', (_req, res) => {
  const recipes = loadRecipeData();
  const recipe = recipes[Math.floor(Math.random() * recipes.length)];
  res.json(recipe);
});

router.get('/:id', (req, res) => {
  const recipes = loadRecipeData();
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.id === Number(req.params.id)
  );
  if (filteredRecipes.length === 0) {
    res
      .status(404)
      .json({ message: `Recipe with id: ${req.params.id} not found` });
  } else {
    res.json(filteredRecipes.shift());
  }
});

// create recipe
// router.post('/', checkAuth, (req, res) => {
//   if (!req.body.question && !req.body.answer) {
//     res.json(400).json({ message: 'bad request, no question or answer' });
//   } else {
//     const jokes = loadJokesData();
//     const joke = {
//       id: uuidv4(),
//       question: req.body.question,
//       answer: req.body.answer,
//       posted: Date.now(),
//     };
//     jokes.push(joke);
//     fs.writeFileSync('./data/jokes.json', JSON.stringify(jokes), 'utf8');
//     res.status(200).json({ message: 'joke created', jokes });
//   }
// });

// update recipe
// router.put('/:id', checkAuth, (req, res) => {
//   if (!req.body) {
//     res.json(400).json({
//       message: 'bad request, please provide at least a question or answer',
//     });
//   } else {
//     const jokes = loadJokesData();
//     const jokeIndex = jokes.findIndex((joke) => joke.id === req.params.id);
//     if (jokeIndex === -1) {
//       res
//         .status(404)
//         .json({ message: `Joke with id: ${req.params.id} not found` });
//     } else {
//       const joke = jokes[jokeIndex];
//       if (req.body.question) joke.question = req.body.question;
//       if (req.body.answer) joke.answer = req.body.answer;
//       jokes.splice(jokeIndex, 1, joke);
//       fs.writeFileSync('./data/jokes.json', JSON.stringify(jokes), 'utf8');
//       res.status(200).json({ success: 'joke updated', jokes });
//     }
//   }
// });

// delete single recipe by id
router.delete('/:id', checkAuth, (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Error recipe not deleted' });
  } else {
    const recipes = loadRecipeData();
    const recipeIndex = recipes.findIndex(
      (recipe) => joke.id === req.params.id
    );
    if (recipeIndex === -1) {
      res
        .status(404)
        .json({ message: `Recipe with id: ${req.params.id} not found` });
    } else {
      recipes.splice(jokeIndex, 1);
      fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes), 'utf8');
      res.json({ success: 'recipe deleted', recipes });
    }
  }
});

export default router;
