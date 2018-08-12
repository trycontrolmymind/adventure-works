const Joi = require('joi');

/**
 * Validate incoming message for the format:
 * {
 *     "name": "Elvis Presley",
 *     "email": "theking@elvismansion.com",
 *     "productid": "8",
 *     "review": "I really love the product and will recommend!",
 *     "reviewId": "9"
 *   }
 * @param {*} review
 * @return {Promise}
 */
function validateReview(review) {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      productid: Joi.number().required(),
      review: Joi.string().required(),
      reviewId: Joi.number().required(),
    });

    Joi.validate(review, schema, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

module.exports = validateReview;
