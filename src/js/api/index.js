/** logging using common module with winston */
const logger = require('../commons/logger');
const bodyParser = require('body-parser');
/** router using express */
const express = require('express');
const app = express();
const reviewsRoute = require('./routes/reviews');
const {connectPool} = require('../commons/postgresConnect');

connectPool()
.then(() => {
  logger.info('Connected to Postgres...');
})
.catch((error) => {
  logger.error(error);
});

/** disable x-powered-by: express */
app.disable('x-powered-by');

/** Some env parameters */
const PORT = process.env.SERVER_PORT || 8888;
const ENV = process.env.NODE_ENV || 'production';
const API_PREFIX = process.env.API_PREFIX || 'api';

/** parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({extended: false}));
/** parse application/json */
app.use(bodyParser.json());

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
