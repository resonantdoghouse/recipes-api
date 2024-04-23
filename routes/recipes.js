import express from "express";
import fs from "fs";
import { checkApiKey } from "../middleware/middleware.js";
import { v4 as uuidv4 } from "uuid";
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
    (recipe) => recipe.id === req.params.id
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
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.ingredients ||
    !req.body.instructions
  ) {
    res.json({
      message:
        "Please provide the following: name, description, ingredients and instructions",
    });
  } else {
    const recipes = loadRecipeData();
    const newRecipe = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      postedDate: Date.now(),
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    };
    recipes.push(newRecipe);

    fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes));
    res.status(201).json({
      message: "recipe created",
      recipe: newRecipe,
    });
  }
});

export default router;
