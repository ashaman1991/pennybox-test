const UserSchema = require('./user.model');

async function addDevice(params) {
  const { userId, deviceId } = params;
  if (!userId) {
    throw new Errow({ message: 'No userId provided' });
  }
  if (!deviceId) {
    throw new Error({ message: 'Missing deviceId' });
  }

  const user = await UserSchema.findById(userId);
  if (!user) {
    throw new Error("User doesn't exist.");
  }
  user.deviceId = deviceId;
  await user.save();
  return { message: 'Device assigned to user' };
}

module.exports = addDevice;
