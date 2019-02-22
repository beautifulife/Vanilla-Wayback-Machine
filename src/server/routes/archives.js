const express = require('express');
const axios = require('axios');
const Inliner = require('inliner');
const Archives = require('../models/Archive');
const Pages = require('../models/Page');
require('dotenv').config();
const {
  BadRequestError,
  NotFoundError,
  InternalServiceError
} = require('../lib/error');

const router = express.Router();

router.get('/:url/:moment', (req, res, next) => {
  const requestUrl = req.params.url;

  if (isNaN(Date.parse(req.params.moment))) {
    console.error(`unexpected moment:${req.params.moment} injected`);

    return next(new BadRequestError());
  }

  try {
    Archives.findOne(
      { url: requestUrl, date: req.params.moment },
      (err, archive) => {
        if (err) {
          console.error(err);

          return next(new InternalServiceError());
        }

        if (archive) {
          res.json({
            message: 'ok',
            requestUrl,
            archive
          });
        } else {
          res.json({
            message: 'empty',
            requestUrl
          });
        }
      }
    );
  } catch (err) {
    console.err(err);

    next(new InternalServiceError());
  }
});

router.get('/:url', (req, res, next) => {
  const requestUrl = req.params.url;
  const fullRequestUrl = `https://${requestUrl}`;

  Archives.find({ url: requestUrl }, 'date', (err, datesOfArchives) => {
    if (err) {
      console.error(err);

      return next(new InternalServiceError());
    }

    if (datesOfArchives.length) {
      datesOfArchives = datesOfArchives.map((archive) => {
        return archive.date;
      });

      res.json({
        message: 'ok',
        action: 'GET',
        requestUrl,
        datesOfArchives
      });
    } else {
      axios(fullRequestUrl)
        .then((response) => {
          res.json({
            message: 'empty',
            action: 'GET',
            requestUrl
          });
        })
        .catch((err) => {
          res.json({
            message: 'error',
            action: 'GET',
            requestUrl
          });
        });
    }
  });
});

router.post('/:url', (req, res, next) => {
  const requestUrl = req.params.url;
  const fullRequestUrl = `https://${requestUrl}`;

  Pages.findOne({ url: requestUrl }, (err, page) => {
    if (err) {
      console.error(err);

      return next(new InternalServiceError());
    }

    if (page) {
      return;
    }

    Pages.create({ url: requestUrl }, (err, page) => {
      if (err) {
        console.error(err);

        return next(new InternalServiceError());
      }
    });
  });

  const inlinerOption = {
    images: true,
    compressCSS: true,
    compressJS: true,
    collapseWhitespace: true,
    nosvg: false,
    skipAbsoluteUrls: true,
    preserveComments: false,
    iesafe: false
  };

  new Inliner(fullRequestUrl, inlinerOption, (err, html) => {
    if (err) {
      console.error(err);

      return next(new InternalServiceError());
    }

    if (!html) {
      return console.error('empty html injected');
    }

    Archives.create({ url: requestUrl, html }, (err, archive) => {
      if (err) {
        console.error(err);

        return next(new InternalServiceError());
      }

      res.json({
        message: 'ok',
        action: 'POST',
        archivedDate: archive.date,
        registeredUrl: requestUrl
      });
    });
  });
});

module.exports = router;
