/** logging using common module with winston */
const logger = require('../commons/logger');

/** router using express */
const express = require('express');
const app = express();
/** disable x-powered-by: express */
app.disable('x-powered-by');
const reviewsRoute = require('./routes/reviews');

/** Some env parameters */
const PORT = process.env.SERVER_PORT || 8888;
const ENV = process.env.NODE_ENV || 'production';
const API_PREFIX = process.env.API_PREFIX || 'api';

/** Global /api/ prefix for reviewsRoutes */
app.use('/' + API_PREFIX, reviewsRoute);

/** Answer empty 404 if no route found */
app.use((_, res) => res.sendStatus(404));

/** Listen PORT for incoming requests */
app.listen(PORT, () => {
  logger.info(
    `[${ENV}] API listening connections :${PORT}`
  );
});
