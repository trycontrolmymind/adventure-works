const Joi = require('joi');
const logger = require('../../commons/logger');

module.exports = (req, res, next) => {
  /*
  Validate following format
  {
    "name": "Elvis Presley",
    "email": "theking@elvismansion.com",
    "productid": "8",
    "review": "I really love the product and will recommend!"
  }
  */
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    productid: Joi.number().required(),
    review: Joi.string().required(),
  });

  Joi.validate(req.body, schema, (err) => {
    if (err) {
      logger.error(err);
      console.log(req.body);
      return res.sendStatus(400);
    }

    next();
  });
};
