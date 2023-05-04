const express = require('express');
const cors = require('cors');
const jokeRoutes = require('./routes/jokes');
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log(req.originalUrl);
  res.json({
    message: 'Welcome to my API',
    routes: [
      {
        route: '/jokes',
        description: 'get a collection of jokes',
        method: 'get',
      },
      {
        route: '/jokes/:id',
        description: "get a single joke by it's id",
        method: 'get',
      },
    ],
  });
});

// api routes
app.use('/jokes', jokeRoutes);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
