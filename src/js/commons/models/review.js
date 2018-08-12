// const logger = require('../logger');

const ReviewStatus = {
  inreview: 1,
  published: 2,
};

/**
 * Return query to insert review
 * @param {*} review Review received
 * @return {query} Query to handle with Postgres
 */
const insertReview = (review) => {
 return {
    name: 'insert-review',
    text: 'INSERT INTO ' +
          'production.productreview(productid, reviewername,' +
          'emailaddress, rating, comments, productreviewstatusid) '+
          'VALUES($1, $2, $3, $4, $5, $6) '+
          'RETURNING productreviewid',
    values: [
      review['productid'],
      review['name'],
      review['email'],
      3,
      review['review'],
      ReviewStatus.inreview,
    ],
 };
};

module.exports = {
  ReviewStatus,
  insertReview,
};
