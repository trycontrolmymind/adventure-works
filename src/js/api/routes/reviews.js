/** Create reviews router */
const express = require('express');
const reviews = express();
/** disable x-powered-by: express */
reviews.disable('x-powered-by');

/** listen to POST requests */
reviews.post('/reviews', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  res.send('test');
});

module.exports = reviews;
