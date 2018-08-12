const NOTIFICATION_QUEUE = process.env.NOTIFICATION_QUEUE ||
                          'notification-queue';
const logger = require('../commons/logger');
const bus = require('../commons/redisConnect');
const onMessageReceived = require('./onMessageReceived');

/** Redis connection */
bus.connect();
bus.on('online', function() {
  /** queue to notifications */
  notifyQ = bus.queue(NOTIFICATION_QUEUE);

  /** Listen for incoming msgs in review queue */
  notifyQ.on('message', (msg, id) => {
    logger.info('[.] Received a msg from review Notification Queue', msg);

    onMessageReceived(msg, id)
      .then((okMsg) => {
        notifyQ.ack(id);
        logger.info(`[x] Sending email to ${okMsg.email}`);
        logger.info(`[x]
          Hello, ${okMsg.name}.
          Your review
          "${okMsg.review}"
          has been ${okMsg.isValid ? 'published!': 'marked as inappreciate!'}
        `);
      })
      .catch((error) => {
        /** exclude from queue anyway */
        logger.error(error);
        notifyQ.ack(id);
      });
  });

  notifyQ.attach();
  notifyQ.consume({reliable: true});
});
