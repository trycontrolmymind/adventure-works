const Joi = require('joi');
const joiSchema = require('../commons/models/joiSchema');
/**
 * Validate incoming message for the format:
 * {
 *     "name": "Elvis Presley",
 *     "email": "theking@elvismansion.com",
 *     "productid": "8",
 *     "review": "I really love the product and will recommend!",
 *     "reviewId": "9",
 *     "isValid": true
 *   }
 * @param {*} review
 * @return {Promise}
 */
function validateReview(review) {
  return new Promise((resolve, reject) => {
    const extJoiScheme = joiSchema;
    extJoiScheme.reviewId = Joi.number().required();
    extJoiScheme.isValid = Joi.boolean().required();
    const schema = Joi.object().keys(extJoiScheme);

    Joi.validate(review, schema, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

module.exports = validateReview;
