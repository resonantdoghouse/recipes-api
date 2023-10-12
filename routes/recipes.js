import express from "express";
import fs from "fs";
import { checkApiKey } from "../middleware/middleware.js";
const router = express.Router();

function loadRecipeData() {
  return JSON.parse(fs.readFileSync("./data/recipes.json", "utf8"));
}

router.get("/", checkApiKey, (_req, res) => {
  const recipes = loadRecipeData();

  res.json(
    recipes.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.name,
        postedDate: recipe.postedDate,
      };
    })
  );
});

router.get("/random", checkApiKey, (_req, res) => {
  const recipes = loadRecipeData();
  const recipe = recipes[Math.floor(Math.random() * recipes.length)];
  res.json(recipe);
});

router.get("/:id", checkApiKey, (req, res) => {
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

router.post("/", checkApiKey, (req, res) => {
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add a new recipe',
                schema: {
                    $name: 'Recipe Name',
                    $ingredients: ['ingredient 1', 'ingredient 2'],
                    $instructions: ['step 1', 'step 2']
                }
        } */
  if (!req.body.name || !req.body.ingredients || !req.body.instructions) {
    res.json({
      message:
        "Please provide the following: name, ingredients and instructions",
    });
  } else {
    const recipes = loadRecipeData();
    recipes.push({
      id: recipes.length + 1,
      name: req.body.name,
      postedDate: Date.now(),
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    });

    fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes));
    res.json(recipes);
  }
});

export default router;
