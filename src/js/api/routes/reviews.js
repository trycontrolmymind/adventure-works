const logger = require('../../commons/logger');
/** Create reviews router */
const express = require('express');
const reviews = express();
/** middleware to validate request */
const validateReview = require('../middleware/validateReview');
/** review model */
const {getClient} = require('../../commons/postgresConnect');
const {insertReview} = require('../../commons/models/review');
const bus = require('../../commons/redisConnect');
const REVIEW_QUEUE = process.env.REVIEW_QUEUE || 'review-queue';
/** disable x-powered-by: express */
reviews.disable('x-powered-by');

/** listen to POST requests */
reviews.post('/reviews', validateReview, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const client = getClient();
  if (!client) {
    return res.json({
      success: false,
      message: 'No connection to DB',
    });
  }

  client
    .query(
      /** Get query to insertReview */
      insertReview(req.body)
    )
    /** Try to insert query */
    .then((result) => {
      res.send({
        success: true,
        reviewId: result.rows[0].productreviewid,
      });

      /** Add this review to queue */
      const queue = bus.queue(REVIEW_QUEUE);
      queue.attach();
      const msg = {
        reviewId: result.rows[0].productreviewid,
        review: req.body.review,
        email: req.body.email,
        name: req.body.name,
        productid: req.body.productid,
      };
      queue.push(msg, (err) => {
        if (err) {
          logger.error(err);
        } else {
          logger.info('[x] Push a msg to review Queue', msg);
        }
      });
    })
    .catch((error) => {
      logger.error(error);
      if (!res.finished) {
        res.send({
          success: false,
          message: error.detail,
        });
      }
    });
});

module.exports = reviews;
