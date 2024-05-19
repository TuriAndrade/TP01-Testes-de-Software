const UserStickerFactory = require("./UserStickerFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

function buildUserSticker(params) {
  const UserStickerEntity = UserStickerFactory({ InvalidParamError });

  return new UserStickerEntity(params);
}

module.exports = buildUserSticker;
