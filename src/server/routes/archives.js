const router = require('express').Router();
const axios = require('axios');
const mongoose = require('mongoose');
const Archives = require('../models/Archive');

require('dotenv').config();

const { BadRequestError, NotFoundError, InternalServiceError } = require('../lib/error');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const mongodbUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

mongoose.connect(mongodbUri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('success db connect');
});

router.get('/:url', (req, res, next) => {
  Archives.find({}, (err, problem) => {
    if (err) {
      console.error(err);

      return next(new InternalServiceError());
    }

    if (!problem) {
      return next();
    }

    res.render('problem', {
      title: `Codewars-${problem.title}`,
      problem
    });
  });
});

router.post('/:url', (req, res, next) => {
  let requestUrl = req.params.url;
  console.log(req.params.url);

  if (!requestUrl.match('http')) {
    requestUrl = `https://${requestUrl}`;
  }

  axios.get(requestUrl)
    .then((res) => {
      console.log(res);
      Archives.create(
        {
          url: requestUrl,
          html: res.data
        },
        (err, problem) => {
          if (err) {
            console.error(err);

            return next(new InternalServiceError());
          }
        }
      );
    })
    .catch(err => console.log(err));
});

module.exports = router;
