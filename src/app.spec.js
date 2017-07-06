/* tslint:disable:only-arrow-functions no-invalid-this */
const App = require('./app');
const request = require('supertest');
const assert = require('assert');

let TestApplication;
module.exports = TestApplication;

describe('App', () => {
  before('Init app', () => {
    TestApplication = new App();
  });

  it('starts successfully', function(done) {
    TestApplication.run().then(done).catch(done);
  });

  it('responds to requests', function(done) {
    request(TestApplication.app).get('/').expect(200).end(done);
  });
  it('gets users', function(done) {
    request(TestApplication.app)
      .get('/users')
      .expect(200)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        const users = response.body;
        assert.equal(users.length, 2);
        done();
      });
  });
});
