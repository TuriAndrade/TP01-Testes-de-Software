function UserStickerFactory({ InvalidParamError }) {
  return class UserStickerEntity {
    constructor({ amount, userId, stickerId }) {
      if (!amount) {
        throw new InvalidParamError("Quantidade inválida.");
      } else if (!userId || typeof userId != "number") {
        throw new InvalidParamError("Id de usuário inválida.");
      } else if (!stickerId || typeof stickerId != "number") {
        throw new InvalidParamError("Id de figurinha inválida.");
      }

      this.amount = amount;
      this.userId = userId;
      this.stickerId = stickerId;
    }

    toObject() {
      return {
        amount: this.amount,
        userId: this.userId,
        stickerId: this.stickerId,
      };
    }
  };
}

module.exports = UserStickerFactory;
