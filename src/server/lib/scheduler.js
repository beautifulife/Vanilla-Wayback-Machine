const schedule = require('node-schedule');
const Inliner = require('inliner');
const Archives = require('../models/Archive');
const Pages = require('../models/Page');

const rule = new schedule.RecurrenceRule();

rule.dayOfWeek = 1;
rule.hour = 10;

const job = schedule.scheduleJob(rule, () => {
  try {
    Pages.find({}, 'url', (err, pages) => {
      if (err) {
        return console.error(err);
      }

      pages.forEach((page, index) => {
        try {
          const requestUrl = page.url;
          const fullRequestUrl = `https://${requestUrl}`;

          new Inliner(fullRequestUrl, (err, html) => {
            if (err) {
              console.error(err);
            }

            Archives.create(
              {
                url: requestUrl,
                html
              },
              (err, archive) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          });
        } catch (err) {
          console.error(err);
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = job;
