// StickerFactory.test.js

const ExchangeFactory = require("./ExchangeFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

describe("ExchangeEntity", () => {
  describe("constructor", () => {
    it("should create a exchange entity with valid parameters", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });
      const exchange = new ExchangeEntity({
        notificationId: 1,
        stickerNumber: 2,
        userId: 3,
      });

      expect(exchange.notificationId).toBe(1);
      expect(exchange.stickerNumber).toBe(2);
      expect(exchange.userId).toBe(3);
    });

    it("should throw InvalidParamError for invalid notificationId", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            notificationId: "invalid",
            stickerNumber: 2,
            userId: 3,
          })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for invalid stickerNumber", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            notificationId: 1,
            stickerNumber: "invalid",
            userId: 3,
          })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for invalid userId", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            notificationId: 1,
            stickerNumber: 2,
            userId: "invalid",
          })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for multiple invalid parameters", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            notificationId: 1,
            stickerNumber: "invalid",
            userId: "invalid",
          })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for missing notificationId", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            stickerNumber: 2,
            userId: 3,
          })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for missing stickerNumber", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            notificationId: 1,
            userId: 3,
          })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for missing userId", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            notificationId: 1,
            stickerNumber: 2,
          })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for multiple missing parameters", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });

      expect(
        () =>
          new ExchangeEntity({
            notificationId: 1,
          })
      ).toThrow(InvalidParamError);
    });
  });

  describe("toObject", () => {
    it("should return an object representation of the exchange entity", () => {
      const ExchangeEntity = ExchangeFactory({ InvalidParamError });
      const exchange = new ExchangeEntity({
        notificationId: 1,
        stickerNumber: 2,
        userId: 3,
      });

      const result = exchange.toObject();

      expect(result).toEqual({
        notificationId: 1,
        stickerNumber: 2,
        userId: 3,
      });
    });
  });
});
