// Test specific configuration
const testConfig = {
  port: process.env.PORT || 9002,

  mongo: {
    uri: 'mongodb://192.168.99.100:27017/pennybox-nodejs-test-task-development',
    debug: false
  }
};

module.exports = testConfig;
