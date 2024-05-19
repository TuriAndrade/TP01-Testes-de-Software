const StickerFactory = require("./StickerFactory");
const InvalidParamError = require("../../../../errors/InvalidParamError");

function buildSticker(params) {
  const StickerEntity = StickerFactory({ InvalidParamError });

  return new StickerEntity(params);
}

module.exports = buildSticker;
