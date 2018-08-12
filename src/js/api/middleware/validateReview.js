const Joi = require('joi');
const joiSchema = require('../../commons/models/joiSchema');
const logger = require('../../commons/logger');

/*
  Validate following format
  {
    "name": "Elvis Presley",
    "email": "theking@elvismansion.com",
    "productid": "8",
    "review": "I really love the product and will recommend!"
  }
*/
module.exports = (req, res, next) => {
  const schema = Joi.object().keys(joiSchema);

  Joi.validate(req.body, schema, (err) => {
    if (err) {
      logger.error(err);
      return res.sendStatus(400);
    }

    next();
  });
};
