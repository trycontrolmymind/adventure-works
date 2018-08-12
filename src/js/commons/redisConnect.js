const Bus = require('busmq');
const logger = require('./logger');

const bus = Bus.create({driver: 'ioredis', redis: ['redis://localhost:6379']});
bus.on('error', (err) => {
  logger.error(err);
});

bus.on('online', () => {
  logger.info('Redis successfully connected');
});

module.exports = bus;
