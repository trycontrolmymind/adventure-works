const REVIEW_QUEUE = process.env.REVIEW_QUEUE || 'review-queue';
const NOTIFICATION_QUEUE = process.env.NOTIFICATION_QUEUE ||
                          'notification-queue';
const logger = require('../commons/logger');
const {connectPool, getClient} = require('../commons/postgresConnect');
const bus = require('../commons/redisConnect');
const onMessageReceived = require('./onMessageReceived');
const {ReviewStatus, updateStatus} = require('../commons/models/review');

/** Redis connection */
bus.connect();
bus.on('online', function() {
  /** queue to notifications */
  notifyQ = bus.queue(NOTIFICATION_QUEUE);
  notifyQ.attach();

  /** Queue for reviews */
  queue = bus.queue(REVIEW_QUEUE);
  /** Listen for incoming msgs in review queue */
  queue.on('message', (msg, id) => {
    logger.info('[.] Received a msg from review Queue', msg);

    onMessageReceived(msg, id)
      .then((okMsg) => {
        /** Update status in DB */
        let status = null;
        if (okMsg.isValid) {
          status = ReviewStatus.published;
        } else {
          status = ReviewStatus.inappreciate;
        }
        /** get client and query and execute */
        return getClient().query(
          updateStatus(status, okMsg.reviewId)
        ).then(() => {
          /** we want to return msg as a result */
          return okMsg;
        });
      })
      .then((okMsg) => {
        queue.ack(id);
        /** If msg success update, notify reviewer */
        notifyQ.push(okMsg, (err) => {
          if (err) {
            return logger.error(err);
          }
          logger.info('[x] Pushed review to Notification Queue', okMsg);
        });
      })
      .catch((error) => {
        /** exclude from queue anyway */
        logger.error(error);
      });
  });

  queue.on('attached', () => {
    /** if we get message and not ack, will deliver to another on */
    queue.consume({reliable: true});
  });

  queue.attach();
});

/** PostgreSQL connection */
connectPool()
.then(() => {
  logger.info('Connected to Postgres...');
})
.catch((error) => {
  logger.error(error);
});
