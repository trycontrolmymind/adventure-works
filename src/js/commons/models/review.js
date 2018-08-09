const {Pool} = require('pg');
const pool = new Pool();

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getReviews = (client) => {
  return client.query(
    'SELECT * FROM production.productreview ORDER BY productreviewid ASC'
  );
};

module.exports.Pool = pool;
module.exports.getReviews = getReviews;
