function ExchangeServiceFactory({ ExchangeModel, buildExchange }) {
  return class NotificationService {
    async create(body) {
      const newExchange = buildExchange(body);

      await ExchangeModel.create(newExchange.toObject());
    }
  };
}

module.exports = ExchangeServiceFactory;
