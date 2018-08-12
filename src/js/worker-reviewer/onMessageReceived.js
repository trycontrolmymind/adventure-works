const validateMessage = require('./validateReview');
const processMessage = require('./processMessage');
/**
 * Actions after message was received
 *
 * @param {string} message Message to consume
 * @param {string} id Unique ID in queue
 * @param {*} queue Unique ID in queue
 * @param {*} notifyQ Unique ID in queue
 * @return {Promise<message>} result of message processing
 */
function onReviewReceived(message, id) {
  /** 1. Try to JSON parse incoming msg */
  let parsedMsg = null;
  parsedMsg = JSON.parse(message);
  /** 2. Validate incoming message */
  return validateMessage(parsedMsg)
    .then(() => {
      parsedMsg.isValid = processMessage(parsedMsg.review);
      return parsedMsg;
    });
}

module.exports = onReviewReceived;
