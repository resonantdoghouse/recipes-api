import * as dotenv from 'dotenv';
dotenv.config();
import swaggerAutogen from 'swagger-autogen';

let host, schemes;

if (process.env.NODE_ENV === 'development') {
  host = `localhost:${process.env.PORT}`;
  schemes = ['http'];
} else {
  ('yummy-recipes.herokuapp.com');
  schemes = ['https'];
}

const doc = {
  info: {
    title: 'Recipes API',
    description: 'A practice REST API with mouth-watering recipes?',
  },
  schemes,
  host,
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
