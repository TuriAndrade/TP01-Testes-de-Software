const UserFactory = require("../entities/UserFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

describe("UserEntity", () => {
  describe("constructor", () => {
    it("should create a user entity with valid parameters", () => {
      const UserEntity = UserFactory({ InvalidParamError });
      const user = new UserEntity({ email: "teste@gmail.com", name: "User 1", password: "senha12345" });

      expect(user.email).toBe("teste@gmail.com");
      expect(user.name).toBe("User 1");
      expect(user.password).toBe("senha12345");
    });

    it("should throw InvalidParamError for missing name", () => {
      const UserEntity = UserFactory({ InvalidParamError });

      expect(() => new UserEntity({ email: "teste@gmail.com", password: "senha12345" })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for missing email", () => {
      const UserEntity = UserFactory({ InvalidParamError });

      expect(() => new UserEntity({ name: "User 1", password: "senha12345" })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for missing password", () => {
      const UserEntity = UserFactory({ InvalidParamError });

      expect(() => new UserEntity({ email: "teste@gmail.com", name: "User 1" })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for password length under 8 characters", () => {
      const UserEntity = UserFactory({ InvalidParamError });

      expect(() => new UserEntity({ email: "teste@gmail.com", name: "User 1", password: "123" })).toThrow(InvalidParamError);
    });

    it("should throw InvalidParamError for typeof password is not string", () => {
      const UserEntity = UserFactory({ InvalidParamError });

      expect(() => new UserEntity({ email: "teste@gmail.com", name: "User 1", password: 123456789 })).toThrow(InvalidParamError);
    });
  });
});