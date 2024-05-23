const { Op } = require("sequelize");
const UserStickerServiceFactory = require("./UserStickerServiceFactory");

describe("UserStickerService", () => {
  let UserStickerService;
  let UserStickerModel;
  let buildUserSticker;
  let UserService;
  let StickerService;
  let StickerModel;

  beforeEach(() => {
    UserStickerModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
    };
    buildUserSticker = jest.fn((userSticker) => ({
      ...userSticker,
      toObject: () => userSticker,
    }));
    UserService = {
      getById: jest.fn(),
    };
    StickerService = {
      getByNumber: jest.fn(),
    };
    StickerModel = {
      create: jest.fn(),
    };

    const Service = UserStickerServiceFactory({
      UserStickerModel,
      buildUserSticker,
      UserService,
      StickerService,
      StickerModel,
    });

    UserStickerService = new Service();
  });

  describe("create", () => {
    it("should create a new user sticker", async () => {
      const user = { id: 1 };
      const sticker = { id: 1, number: 1 };

      UserService.getById.mockResolvedValue(user);
      StickerService.getByNumber.mockResolvedValue(null);
      StickerModel.create.mockResolvedValue(sticker);
      UserStickerModel.findOne.mockResolvedValue(null);

      await UserStickerService.create(1, 1);

      expect(UserService.getById).toHaveBeenCalledWith(1);
      expect(StickerService.getByNumber).toHaveBeenCalledWith(1);
      expect(StickerModel.create).toHaveBeenCalledWith({ number: 1 });
      expect(UserStickerModel.create).toHaveBeenCalledWith({
        userId: user.id,
        stickerId: sticker.id,
        amount: 1,
      });
    });

    it("should increment the amount if user sticker already exists", async () => {
      const user = { id: 1 };
      const sticker = { id: 1, number: 1 };
      const userSticker = { increment: jest.fn() };

      UserService.getById.mockResolvedValue(user);
      StickerService.getByNumber.mockResolvedValue(sticker);
      UserStickerModel.findOne.mockResolvedValue(userSticker);

      await UserStickerService.create(1, 1);

      expect(UserService.getById).toHaveBeenCalledWith(1);
      expect(StickerService.getByNumber).toHaveBeenCalledWith(1);
      expect(userSticker.increment).toHaveBeenCalledWith("amount");
    });
  });

  describe("deleteByNumber", () => {
    it("should delete the user sticker if amount is 1", async () => {
      const user = { id: 1 };
      const userSticker = { amount: 1, destroy: jest.fn() };

      UserService.getById.mockResolvedValue(user);
      jest.spyOn(UserStickerService, "getStickerByUser").mockResolvedValue(userSticker);

      await UserStickerService.deleteByNumber(1, 1);

      expect(userSticker.destroy).toHaveBeenCalled();
    });

    it("should decrement the amount if greater than 1", async () => {
      const user = { id: 1 };
      const userSticker = { amount: 2, decrement: jest.fn() };

      UserService.getById.mockResolvedValue(user);
      jest.spyOn(UserStickerService, "getStickerByUser").mockResolvedValue(userSticker);

      await UserStickerService.deleteByNumber(1, 1);

      expect(userSticker.decrement).toHaveBeenCalledWith("amount");
    });
  });

  describe("getStickerByUser", () => {
    it("should return the sticker for a user by number", async () => {
      const userSticker = { id: 1, userId: 1, stickerId: 1 };

      UserStickerModel.findOne.mockResolvedValue(userSticker);

      const result = await UserStickerService.getStickerByUser(1, 1);

      expect(result).toEqual(userSticker);
      expect(UserStickerModel.findOne).toHaveBeenCalledWith({
        where: { userId: 1 },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: { model: StickerModel, where: { number: 1 } },
      });
    });
  });

  describe("getAllStickersByUser", () => {
    it("should return all stickers for a user", async () => {
      const userStickers = [{ Sticker: { number: 2 } }, { Sticker: { number: 1 } }];

      UserStickerModel.findAll.mockResolvedValue(userStickers);

      const result = await UserStickerService.getAllStickersByUser(1);

      expect(result).toEqual([{ Sticker: { number: 1 } }, { Sticker: { number: 2 } }]);
      expect(UserStickerModel.findAll).toHaveBeenCalledWith({
        where: { userId: 1 },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: { model: StickerModel },
      });
    });
  });

  describe("getAllDuplicatesByUser", () => {
    it("should return all duplicate stickers for a user", async () => {
      const duplicates = [{ Sticker: { number: 1 }, amount: 2 }];

      UserStickerModel.findAll.mockResolvedValue(duplicates);

      const result = await UserStickerService.getAllDuplicatesByUser(1);

      expect(result).toEqual(duplicates);
      expect(UserStickerModel.findAll).toHaveBeenCalledWith({
        where: { userId: 1, amount: { [Op.gt]: 1 } },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: { model: StickerModel },
      });
    });
  });
});
