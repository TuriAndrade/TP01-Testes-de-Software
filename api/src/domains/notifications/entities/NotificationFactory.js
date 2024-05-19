function NotificationFactory({ InvalidParamError }) {
  return class NotificationEntity {
    constructor({ from, to }) {
      if (!from || typeof from != "number") {
        throw new InvalidParamError("Id do remetende inválido.");
      } else if (from < 1) {
        throw new InvalidParamError("Id do remetende deve ser maior do que 0.");
      } else if (!to || typeof to != "number") {
        throw new InvalidParamError("Id do destinatário inválido.");
      } else if (to < 1) {
        throw new InvalidParamError(
          "Id do destinatário deve ser maior do que 0."
        );
      }

      this.from = from;
      this.to = to;
    }

    toObject() {
      return {
        from: this.from,
        to: this.to,
      };
    }
  };
}

module.exports = NotificationFactory;
