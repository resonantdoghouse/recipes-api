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

export default router;
