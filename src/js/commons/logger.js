const winston = require('winston');
const logger = winston.createLogger({});

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'error.log',
      level: 'warning',
      format: winston.format.json(),
    })
  );
}

logger.add(
  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    color: true,
  })
);


module.exports = logger;
