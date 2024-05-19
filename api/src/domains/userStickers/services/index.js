const UserStickerModel = require("../models/UserSticker.js");
const buildUserSticker = require("../entities");
const UserService = require("../../users/services");
const StickerService = require("../../stickers/services");
const StickerModel = require("../../stickers/models/Sticker.js");

const UserStickerServiceFactory = require("./UserStickerServiceFactory");

const UserStickerService = UserStickerServiceFactory({
  UserStickerModel,
  StickerModel,
  buildUserSticker,
  UserService,
  StickerService,
});

module.exports = new UserStickerService();
