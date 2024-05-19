const ExchangeFactory = require("./ExchangeFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

function buildExchange(params) {
  const ExchangeEntity = ExchangeFactory({ InvalidParamError });

  return new ExchangeEntity(params);
}

module.exports = buildExchange;
