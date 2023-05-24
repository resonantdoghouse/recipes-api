import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json' assert { type: "json" };
import recipeRoutes from './routes/recipes.js';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// api routes
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
