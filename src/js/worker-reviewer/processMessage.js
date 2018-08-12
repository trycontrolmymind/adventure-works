const badWords = require('./badWords.json');
const logger = require('../commons/logger');

/**
 * Check that message
 * not include Bad words
 *
 * @param {String} message
 * @return {Boolean} is message valid
 */
function processMessage(message) {
  if (!message) {
    logger.error('Message for review is not defined');
    return;
  }
  for (let i = 0; i < badWords.words.length; i++) {
    const word = badWords.words[i];
    if (message.includes(word)) {
      return false;
    }
  }
  return true;
}

module.exports = processMessage;
