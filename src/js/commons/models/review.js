// const logger = require('../logger');

const ReviewStatus = {
  inreview: 1,
  published: 2,
  inappreciate: 3,
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

/**
 * Update status of existed product review
 *
 * @param {ReviewStatus} status Status to update
 * @param {number} reviewId Review to update
 * @return {query} query
 */
const updateStatus = (status, reviewId) => {
  return {
    name: 'update-review-status',
    text: 'UPDATE ' +
          'production.productreview ' +
          'SET productreviewstatusid = $1' +
          'WHERE productreviewid = $2',
    values: [
      status,
      reviewId,
    ],
  };
};

module.exports = {
  ReviewStatus,
  insertReview,
  updateStatus,
};
