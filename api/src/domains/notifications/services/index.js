const NotificationModel = require("../models/Notification");
const ExchangeModel = require("../../exchange/models/Exchange");
const ExchangeService = require("../../exchange/services");
const UserService = require("../../users/services");
const buildNotification = require("../entities");

const NotificationServiceFactory = require("./NotificationServiceFactory");

const NotificationService = NotificationServiceFactory({
  NotificationModel,
  ExchangeModel,
  buildNotification,
  ExchangeService,
  UserService,
});

module.exports = new NotificationService();
