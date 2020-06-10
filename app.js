const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal server error',
  });
  next();
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Is Running On Port http://localhost:${config.port}`);
});
