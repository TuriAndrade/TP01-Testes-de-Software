const NotificationFactory = require("./NotificationFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

function buildNotification(params) {
  const UserEntity = NotificationFactory({ InvalidParamError });

  return new UserEntity(params);
}

module.exports = buildNotification;
