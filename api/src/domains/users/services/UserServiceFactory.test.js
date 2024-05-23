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

const UserServiceFactory = require("./UserServiceFactory");

describe("UserService", () => {
  let UserService;
  let UserModel;
  let buildUser;
  let NotAuthorizedError;
  let PermissionError;
  let QueryError;

  beforeEach(() => {
    UserModel = {
      findOne: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
    };
    buildUser = jest.fn((user) => user);
    NotAuthorizedError = class extends Error {};
    PermissionError = class extends Error {};
    QueryError = class extends Error {};

    const Service = UserServiceFactory({
      UserModel,
      buildUser,
      NotAuthorizedError,
      PermissionError,
      QueryError,
    });

    UserService = new Service();
  });

  describe("create", () => {
    it("should throw an error if email already exists", async () => {
      UserModel.findOne.mockResolvedValue({ email: "test@example.com" });
      await expect(UserService.create({ email: "test@example.com", name: "User", password: "password123" }))
        .rejects.toThrow(QueryError);
    });

    it("should create a new user if email does not exist", async () => {
      UserModel.findOne.mockResolvedValue(null);
      const user = { email: "test@example.com", name: "User", password: "password123" };

      await UserService.create(user);
      expect(UserModel.create).toHaveBeenCalledWith(user);
    });
  });

  describe("getAll", () => {
    it("should throw an error if no users are found", async () => {
      UserModel.findAll.mockResolvedValue(null);
      await expect(UserService.getAll(1)).rejects.toThrow(QueryError);
    });
  });

  describe("getById", () => {
    it("should return a user by ID", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      UserModel.findByPk.mockResolvedValue(user);

      const result = await UserService.getById(1);
      expect(result).toEqual(user);
    });

    it("should throw an error if no user is found", async () => {
      UserModel.findByPk.mockResolvedValue(null);
      await expect(UserService.getById(1)).rejects.toThrow(QueryError);
    });
  });

  describe("update", () => {
    it("should update user details", async () => {
      const user = { id: 1, update: jest.fn() };
      jest.spyOn(UserService, "getById").mockResolvedValue(user);

      await UserService.update(1, { name: "New Name" }, { id: 1 });
      expect(user.update).toHaveBeenCalledWith({ name: "New Name" });
    });

    it("should throw an error if logged-in user tries to update another user", async () => {
      const user = { id: 1 };
      jest.spyOn(UserService, "getById").mockResolvedValue(user);

      await expect(UserService.update(1, { name: "New Name" }, { id: 2 }))
        .rejects.toThrow(NotAuthorizedError);
    });
  });

  describe("delete", () => {
    it("should delete a user", async () => {
      const user = { id: 1, destroy: jest.fn() };
      jest.spyOn(UserService, "getById").mockResolvedValue(user);

      await UserService.delete(1, 2);
      expect(user.destroy).toHaveBeenCalled();
    });

    it("should throw an error if user tries to delete themselves", async () => {
      await expect(UserService.delete(1, 1)).rejects.toThrow(PermissionError);
    });
  });
});
