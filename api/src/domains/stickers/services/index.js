const StickerModel = require("../models/Sticker");
const buildSticker = require("../entities/index");
const QueryError = require("../../../../errors/QueryError");
const InvalidParamError = require("../../../../errors/InvalidParamError");
const StickerServiceFactory = require("./StickerServiceFactory");

const StickerService = StickerServiceFactory({
  StickerModel,
  buildSticker,
  QueryError,
  InvalidParamError,
});

module.exports = new StickerService();
