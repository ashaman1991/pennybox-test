/* tslint:disable:only-arrow-functions no-invalid-this */
const App = require('./app');
const request = require('supertest');
const assert = require('chai').assert;
const UserModel = require('./api/user/user.model');
const TaskModel = require('./api/task/task.model');
const NotificationModel = require('./api/notification/notification.model');

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
        assert.lengthOf(users, 2);
        done();
      });
  });

  it('Removes single user with related data', function() {
    const userId = '595e308c5fd8a47d4c3049e1';
    return request(TestApplication.app)
      .del(`/users/${userId}?id=${userId}`)
      .expect(200)
      .then(response => {
        assert.equal(response.body.message, `User ${userId} removed`);
        return Promise.all([
          UserModel.findById(userId),
          TaskModel.find({}),
          NotificationModel.find({})
        ]);
      })
      .then(([user, tasks, notifications]) => {
        assert.notOk(user);
        assert.lengthOf(tasks, 0);
        assert.lengthOf(notifications, 0);
      });
  });
});
