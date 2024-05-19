const UserFactory = require("./UserFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

function buildUser(params) {
  const UserEntity = UserFactory({ InvalidParamError });

  return new UserEntity(params);
}

module.exports = buildUser;
