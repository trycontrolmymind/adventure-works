const Joi = require('joi');

const schema = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  productid: Joi.number().required(),
  review: Joi.string().required(),
};

module.exports = schema;
