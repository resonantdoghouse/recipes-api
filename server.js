import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert { type: "json" };
import recipeRoutes from "./routes/recipes.js";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/recipes", recipeRoutes);

app.get("/register", (req, res) => {
  const apiKey = uuidv4(); // Generate a new API key
  res.json({ apiKey });
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
