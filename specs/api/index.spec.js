const expect = require('chai').expect;
const fetch = require('node-fetch');
const PORT = process.env.SERVER_PORT;

describe('API Node.js', () => {
  it('should return 404 if unexisted path', (done) => {
    fetch('http://localhost:' + PORT + '/' + Math.random())
      .then((resp) => {
        expect(resp.status).to.equal(404);
        done();
      })
      .catch(done);
  });

  it('should not have X-Powered-By header', (done) => {
    fetch('http://localhost:' + PORT + '/api/reviews', {

    })
    .then((resp) => {
      expect(resp.status).to.equal(404);
      expect(resp.headers.get('x-powered-by')).to.equal(null);
      done();
    })
    .catch(done);
  });
});

