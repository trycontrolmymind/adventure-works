const REDIS_CONNECTION = process.env.REDIS_CONNECTION || 'redis://localhost:6379';
const Bus = require('busmq');
const logger = require('./logger');

const bus = Bus.create({driver: 'ioredis', redis: [REDIS_CONNECTION]});
bus.on('error', (err) => {
  logger.error(err);
});

bus.on('online', () => {
  logger.info('Redis successfully connected');
});

module.exports = bus;
