/** router using express */
const express = require('express');
const app = express();
/** logging using common module with winston */
const logger = require('../commons/logger');
/** Some env parameters */
const PORT = process.env.SERVER_PORT || 8888;
const ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  logger.info(
    `[${ENV}] API listening connections :${PORT}`
  );
});
