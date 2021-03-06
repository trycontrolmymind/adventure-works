const {Pool} = require('pg');
const logger = require('./logger');
let client = null;

/**
 * Connects to Postgres
 * @return {Promise}
 */
function connectPool() {
  const pool = new Pool();

  /**
   * Connect to a Postgres
   * @return {Promise}
   */
  function _connectPool() {
    return pool.connect()
      .then((connect) => {
        client = connect;
        return;
      })
      .catch((error) => {
        /** Reconnect on errors */
        setTimeout(() => {
          _connectPool()
          .then((_connection) => {
            client = _connection;
            logger.info('PostgreSQL reconnected');
          })
          .catch((error) => {
            logger.error(error);
          });
        }, 1000);
        throw error;
      });
  };

  return _connectPool();
}

module.exports = {
  connectPool: connectPool,
  getClient: () => {
    return client;
  },
};
