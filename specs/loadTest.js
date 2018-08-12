const loadtest = require('loadtest');

const options = {
  url: 'http://localhost:8888/api/reviews',
  maxRequests: 10000,
  rps: 120,
  secureProtocol: 'TLSv1_method',
  statusCallback,
  method: 'POST',
  body: {
    'name': 'Elvis Presley',
    'email': 'theking@elvismansion.com',
    'productid': 1,
    'review': 'I really love the product and will recommend!',
  },
  contentType: 'application/json',
  headers: {
    'Content-Type': 'application/json',
  },
};

loadtest.loadTest(options, (error) => {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log('Tests run successfully');
});

/**
 * Some test pre resulter
 *
 * @param {*} error
 * @param {*} result
 * @param {*} latency
 */
function statusCallback(error, result, latency) {
  console.log('Current latency %j, result %j, error %j',
    latency, result, error);
  console.log('----');
}
