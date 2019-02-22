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
  console.log(req.params.url);

  Archives.findOne({ url: requestUrl, date: req.params.moment }, (err, archive) => {
    if (err) {
      console.error(err);
      console.log(err);

      return next(new InternalServiceError());
    }

    console.log(requestUrl, 'url있냐?');

    if (archive) {
      res.json({
        status: 'ok',
        requestUrl,
        archive
      });
    } else {
      res.json({
        status: 'empty',
        requestUrl,
      });
    }
  });
});

router.get('/:url', (req, res, next) => {
  const requestUrl = req.params.url;
  const fullRequestUrl = `https://${requestUrl}`;
  console.log(req.params.url);

  Archives.find({ url: requestUrl }, 'date', (err, datesOfArchives) => {
    if (err) {
      console.error(err);
      console.log(err);

      return next(new InternalServiceError());
    }

    console.log(requestUrl, 'url있냐?');

    if (datesOfArchives.length) {
      datesOfArchives = datesOfArchives.map((archive) => {
        return archive.date;
      });

      res.json({
        status: 'ok',
        action: 'GET',
        requestUrl,
        datesOfArchives
      });
    } else {
      console.log('이제 테스트를 날리겠다', fullRequestUrl);
      axios(fullRequestUrl)
        .then((response) => {
          console.log(response);
          res.json({
            status: 'empty',
            action: 'GET',
            requestUrl,
          });
        })
        .catch((err) => {
          console.log('역시없지?');
          res.json({
            status: 'error',
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

  console.log(req.params.url);

  Pages.findOne({ url: requestUrl }, (err, page) => {
    if (err) {
      console.error(err);
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
    iesafe: false,
  };

  new Inliner(fullRequestUrl, inlinerOption,(err, html) => {
    if (err) {
      return console.error(err);
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
        status: 'ok',
        action: 'POST',
        registeredUrl: requestUrl
      });
    });
  });

  // const getPageData = async (urlToFetch) => {
  //   const browser = await puppeteer.launch({headless: false});
  //   const page = await browser.newPage();
});

module.exports = router;
