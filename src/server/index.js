const express = require('express');
const os = require('os');

const app = express();
const { BadRequestError } = require('./lib/error');

app.use(express.static('dist'));

const archives = require('./routes/archives');


app.use('/archives', archives);

app.get('/api/v1/username', (req, res) => res.send({ username: os.userInfo().username }));

app.use((req, res, next) => {
  next(new BadRequestError());
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

app.listen(8080, () => console.log('Listening on port 8080!'));
