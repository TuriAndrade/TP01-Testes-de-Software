function StickerFactory({ InvalidParamError }) {
  return class StickerEntity {
    constructor({ number, name, team }) {
      if (!number || typeof number != "number") {
        throw new InvalidParamError("Número inválido.");
      } else if (number < 1) {
        throw new InvalidParamError("Número deve ser maior do que 0.");
      }

      this.number = number;
      this.name = name;
      this.team = team;
    }

    toObject() {
      return {
        number: this.number,
        name: this.name,
        team: this.team,
      };
    }
  };
}

module.exports = StickerFactory;
