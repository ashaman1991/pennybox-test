const Mongoose = require('mongoose');

const NotificationSchema = new Mongoose.Schema({
  parentId: {
    type: Mongoose.Schema.ObjectId,
    required: true
  }  
});

module.exports = Mongoose.model('Notification', NotificationSchema);
