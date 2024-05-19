const ExchangeModel = require("../models/Exchange");
const buildExchange = require("../entities");

const ExchangeServiceFactory = require("./ExchangeServiceFactory");

const ExchangeService = ExchangeServiceFactory({
  ExchangeModel,
  buildExchange,
});

module.exports = new ExchangeService();
