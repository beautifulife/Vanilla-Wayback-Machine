const express = require('express');
const mongoose = require('mongoose');
require('./lib/scheduler');
const { BadRequestError } = require('./lib/error');
const archives = require('./routes/archives');

const app = express();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const mongodbUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

mongoose.connect(mongodbUri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('success db connect');
});

app.use(express.static('dist'));

app.use('/api/archives', archives);

app.use((req, res, next) => {
  next(new BadRequestError());
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
