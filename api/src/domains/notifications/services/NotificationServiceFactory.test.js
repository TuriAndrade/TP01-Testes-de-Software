const NotificationFactory = require("../entities/NotificationFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

describe("NotificationEntity", () => {
  describe("constructor", () => {
    it("should create a user entity with valid parameters", () => {
      const NotificationEntity = NotificationFactory({ InvalidParamError });
      const notification = new NotificationEntity({ from: 1, to: 2 });

      expect(notification.from).toBe(1);
      expect(notification.to).toBe(2);
    });

    it("should throw InvalidParamError for missing from", () => {
      const NotificationEntity = NotificationFactory({ InvalidParamError });

      expect(() => new NotificationEntity({ to: 2 })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for missing to", () => {
      const NotificationEntity = NotificationFactory({ InvalidParamError });

      expect(() => new NotificationEntity({ from: 1 })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for typeof from", () => {
      const NotificationEntity = NotificationFactory({ InvalidParamError });

      expect(() => new NotificationEntity({ from: "1", name: 2 })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for typeof to", () => {
      const NotificationEntity = NotificationFactory({ InvalidParamError });

      expect(() => new NotificationEntity({ from: 1, to: "2" })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for from less than 1", () => {
      const NotificationEntity = NotificationFactory({ InvalidParamError });

      expect(() => new NotificationEntity({ from: 0, to: 2 })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for to less than 1", () => {
      const NotificationEntity = NotificationFactory({ InvalidParamError });

      expect(() => new NotificationEntity({ from: 1, to: 0 })).toThrow(InvalidParamError);
    });
  });
});