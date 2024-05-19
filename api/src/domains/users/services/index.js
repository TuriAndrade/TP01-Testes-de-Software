const UserModel = require("../models/User.js");
const buildUser = require("../entities/index.js");
const NotAuthorizedError = require("../../../../errors/NotAuthorizedError.js");
const PermissionError = require("../../../../errors/PermissionError.js");
const QueryError = require("../../../../errors/QueryError.js");
const UserServiceFactory = require("./UserServiceFactory.js");

const UserService = UserServiceFactory({
  UserModel,
  buildUser,
  NotAuthorizedError,
  PermissionError,
  QueryError,
});

module.exports = new UserService();
