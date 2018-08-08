/** Create reviews router */
const express = require('express');
const reviews = express();

/** listen to POST requests */
reviews.post('/reviews', (_, res) => {
  res.send('test');
});

module.exports = reviews;
