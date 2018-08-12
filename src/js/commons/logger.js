const winston = require('winston');
// const logger = createLogger({});

if (process.env.NODE_ENV === 'production') {
  winston.add(winston.transports.File, {
      filename: 'error.log',
      level: 'warning',
    }
  );
}

module.exports = winston;
