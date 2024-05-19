// StickerFactory.test.js

const StickerFactory = require("../entities/StickerFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

describe("StickerEntity", () => {
  describe("constructor", () => {
    it("should create a sticker entity with valid parameters", () => {
      const StickerEntity = StickerFactory({ InvalidParamError });
      const sticker = new StickerEntity({ number: 1, name: "Sticker 1", team: "Team A" });

      expect(sticker.number).toBe(1);
      expect(sticker.name).toBe("Sticker 1");
      expect(sticker.team).toBe("Team A");
    });

    it("should throw InvalidParamError for invalid number", () => {
      const StickerEntity = StickerFactory({ InvalidParamError });

      expect(() => new StickerEntity({ number: "invalid" })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for number less than 1", () => {
      const StickerEntity = StickerFactory({ InvalidParamError });

      expect(() => new StickerEntity({ number: 0 })).toThrow(InvalidParamError);
    });
  });

  describe("toObject", () => {
    it("should return an object representation of the sticker entity", () => {
      const StickerEntity = StickerFactory({ InvalidParamError });
      const sticker = new StickerEntity({ number: 1, name: "Sticker 1", team: "Team A" });

      const result = sticker.toObject();

      expect(result).toEqual({
        number: 1,
        name: "Sticker 1",
        team: "Team A",
      });
    });
  });

});
