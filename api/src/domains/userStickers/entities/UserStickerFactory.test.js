const UserStickerFactory = require("./UserStickerFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

describe("UserStickerEntity", () => {
  describe("constructor", () => {
    it("should create a user sticker entity with valid parameters", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });
      const userSticker = new UserStickerEntity({
        amount: 1,
        userId: 2,
        stickerId: 3,
      });

      expect(userSticker.amount).toBe(1);
      expect(userSticker.userId).toBe(2);
      expect(userSticker.stickerId).toBe(3);
    });

    it("should throw InvalidParamError for missing amount", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(() => new UserStickerEntity({ userId: 2, stickerId: 3 })).toThrow(
        InvalidParamError
      );
    });

    it("should throw InvalidParamError for missing userId", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(() => new UserStickerEntity({ amount: 2, stickerId: 3 })).toThrow(
        InvalidParamError
      );
    });

    it("should throw InvalidParamError for missing stickerId", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(() => new UserStickerEntity({ userId: 2, amount: 3 })).toThrow(
        InvalidParamError
      );
    });

    it("should throw InvalidParamError for multiple missing parameters", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(() => new UserStickerEntity({ userId: 2 })).toThrow(
        InvalidParamError
      );
    });

    it("should throw InvalidParamError for invalid amount", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(
        () =>
          new UserStickerEntity({ userId: 2, stickerId: 3, amount: "invalid" })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for invalid userId", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(
        () =>
          new UserStickerEntity({ amount: 2, stickerId: 3, userId: "invalid" })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for invalid stickerId", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(
        () =>
          new UserStickerEntity({ userId: 2, amount: 3, stickerId: "invalid" })
      ).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for multiple invalid parameters", () => {
      const UserStickerEntity = UserStickerFactory({ InvalidParamError });

      expect(
        () =>
          new UserStickerEntity({
            userId: 2,
            stickerId: "invalid",
            amount: "invalid",
          })
      ).toThrow(InvalidParamError);
    });
  });
});
