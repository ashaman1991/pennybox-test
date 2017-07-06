const UserModel = require('./user.model');
const TaskModel = require('../task/task.model');
const NotificationModel = require('../notification/notification.model');

class UserController {
  static async getList(req, res) {
    // TODO: TDD me & Refactor me
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (error) {
      console.log(error);
      res.send(400);
    }
  }
  static async del(req, res) {
    try {
      const userId = req.query.id;
      const targetUserId = req.params.id;
      if (userId !== targetUserId) {
        throw new Error('Must be the same user');
      }
      const tasks = await TaskModel.find({ userId });
      let taskIds = tasks.map(task => task._id);
      await NotificationModel.deleteMany({ parentId: { $in: taskIds } });
      await TaskModel.deleteMany({ userId });
      await UserModel.remove({ _id: userId });
      res.send({ message: `User ${userId} removed` });
    } catch (error) {
      res.send(400, error.message);
    }
  }

  static create(req, res) {
    // TODO: Write implementation here
  }
}

module.exports = UserController;
