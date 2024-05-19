function ExchangeFactory({ InvalidParamError }) {
  return class ExchangeEntity {
    constructor({ notificationId, stickerNumber, userId }) {
      if (!notificationId || typeof notificationId != "number") {
        throw new InvalidParamError("Id da notificação inválida.");
      } else if (!stickerNumber || typeof stickerNumber != "number") {
        throw new InvalidParamError("Número da figurinha inválida.");
      } else if (!userId || typeof userId != "number") {
        throw new InvalidParamError("Id do usuário inválido.");
      }

      this.notificationId = notificationId;
      this.stickerNumber = stickerNumber;
      this.userId = userId;
    }

    toObject() {
      return {
        notificationId: this.notificationId,
        stickerNumber: this.stickerNumber,
        userId: this.userId,
      };
    }
  };
}

module.exports = ExchangeFactory;
