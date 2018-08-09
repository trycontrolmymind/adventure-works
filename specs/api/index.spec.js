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

  it('should return 400 if json is invalid', (done) => {
    fetch('http://localhost:' + PORT + '/api/reviews', {
      method: 'POST',
      body: JSON.stringify({}),
    })
      .then((resp) => {
        expect(resp.status).to.equal(400);
        done();
      })
      .catch(done);
  });

  it('should return 200 if ok body', (done) => {
    const body = {
      name: 'Elvis Presley',
      email: 'theking@elvismansion.com',
      productid: '8',
      review: 'I really love the product and will recommend!',
    };

    fetch('http://localhost:' + PORT + '/api/reviews', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    })
      .then((resp) => {
        expect(resp.status).to.equal(200);
        done();
      })
      .catch(done);
  });
});

