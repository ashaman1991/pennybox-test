const Mongoose = require('mongoose');

const TaskSchema = new Mongoose.Schema({
  userId: {
    type: Mongoose.Schema.ObjectId,
    required: true
  }  
});



module.exports = Mongoose.model('Task', TaskSchema);
