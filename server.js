import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipes.js';
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to my Recipe API',
    routes: [
      {
        route: '/recipes',
        description: 'get a collection of recipes',
        method: 'get',
      },
      {
        route: '/recipes/:id',
        description: "get a single recipe by it's id",
        method: 'get',
      },
      {
        route: '/recipes/random',
        description: 'get a random recipe',
        method: 'get',
      },
      {
        route: '/recipes',
        description: 'post a new recipe',
        method: 'post',
      },
    ],
  });
});

// api routes
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
