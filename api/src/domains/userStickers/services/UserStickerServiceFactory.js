const { Op } = require("sequelize");

function UserStickerServiceFactory({
  UserStickerModel,
  buildUserSticker,
  UserService,
  StickerService,
  StickerModel,
}) {
  return class UserStickerService {
    async create(userId, stickerNumber) {
      const user = await UserService.getById(userId);
      let sticker = await StickerService.getByNumber(stickerNumber);

      if (!sticker) {
        sticker = await StickerModel.create({ number: stickerNumber });
      }

      const exists = await UserStickerModel.findOne({
        where: { userId: user.id, stickerId: sticker.id },
      });
      if (!exists) {
        const newUserSticker = buildUserSticker({
          userId: user.id,
          stickerId: sticker.id,
          amount: 1,
        });

        await UserStickerModel.create(newUserSticker.toObject());
      } else {
        await exists.increment("amount");
      }
    }

    async deleteByNumber(userId, stickerNumber) {
      const user = await UserService.getById(userId);
      const userSticker = await this.getStickerByUser(user.id, stickerNumber);

      if (userSticker) {
        if (userSticker.amount == 1) {
          await userSticker.destroy();
        } else {
          await userSticker.decrement("amount");
        }
      }
    }

    async getStickerByUser(userId, stickerNumber) {
      const sticker = await UserStickerModel.findOne({
        where: {
          userId: userId,
        },

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: StickerModel,
          where: {
            number: stickerNumber,
          },
        },
      });

      return sticker;
    }

    async getAllStickersByUser(userId) {
      const allStickers = await UserStickerModel.findAll({
        where: {
          userId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: StickerModel,
        },
      });

      function comp(a, b) {
        if (a.Sticker.number > b.Sticker.number) {
          return 1;
        } else {
          return -1;
        }
      }

      allStickers.sort(comp);

      return allStickers;
    }

    async getAllDuplicatesByUser(userId) {
      const allStickers = await UserStickerModel.findAll({
        where: {
          userId,
          amount: {
            [Op.gt]: 1,
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: StickerModel,
        },
      });

      return allStickers;
    }

    async getExchangePair(user1Id, user2Id) {
      const user2Duplicates = await this.getAllDuplicatesByUser(user2Id);
      const user1Stickers = await this.getAllStickersByUser(user1Id);

      const user1Wanted = [];

      user2Duplicates.forEach((sticker) => {
        let wanted = true;

        for (let i = 0; i < user1Stickers.length; i++) {
          if (sticker.Sticker.number == user1Stickers[i].Sticker.number) {
            wanted = false;
            break;
          }
        }

        if (wanted == true) {
          user1Wanted.push(sticker);
        }
      });

      const user1Duplicates = await this.getAllDuplicatesByUser(user1Id);
      const user2Stickers = await this.getAllStickersByUser(user2Id);

      const user2Wanted = [];

      user1Duplicates.forEach((sticker) => {
        let wanted = true;

        for (let i = 0; i < user2Stickers.length; i++) {
          if (sticker.Sticker.number == user2Stickers[i].Sticker.number) {
            wanted = false;
            break;
          }
        }

        if (wanted == true) {
          user2Wanted.push(sticker);
        }
      });

      return {
        wanted: user1Wanted,
        nWanted: user1Wanted.length,
        offered: user2Wanted,
        nOffered: user2Wanted.length,
        nAvaliable: Math.min(user2Wanted.length, user1Wanted.length),
      };
    }
  };
}

module.exports = UserStickerServiceFactory;
