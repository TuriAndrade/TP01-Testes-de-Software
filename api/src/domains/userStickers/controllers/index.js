const router = require("express").Router();
const UserStickerService = require("../services/");
const { verifyJWT } = require("../../../middlewares/auth-middlewares");
const statusCodes = require("../../../../constants/statusCodes.js");

//Adiciona figurinhas faltantes e repetidas (caso ele ja tiver vai adicionar nas repetidas)
router.post("/:stickerNumber", verifyJWT, async (req, res, next) => {
  try {
    await UserStickerService.create(req.user.id, req.params.stickerNumber);
    res.status(statusCodes.created).end();
  } catch (error) {
    next(error);
  }
});

//Retorna se o usuário tem a figurinha de número x
router.get("/:stickerNumber", verifyJWT, async (req, res, next) => {
  try {
    const stickers = await UserStickerService.getStickerByUser(
      req.user.id,
      req.params.stickerNumber
    );
    res.status(statusCodes.success).json(stickers);
  } catch (error) {
    next(error);
  }
});

//Retorna figurinhas obtidas do usuário logado
router.get("/", verifyJWT, async (req, res, next) => {
  try {
    const stickers = await UserStickerService.getAllStickersByUser(req.user.id);
    res.status(statusCodes.success).json(stickers);
  } catch (error) {
    next(error);
  }
});

//Retorna repetidas do usuário logado
router.get("/duplicates", verifyJWT, async (req, res, next) => {
  try {
    const stickers = await UserStickerService.getAllDuplicatesByUser(
      req.user.id
    );
    res.status(statusCodes.success).json(stickers);
  } catch (error) {
    next(error);
  }
});

//Retorna faltantes do usuário logado
router.get("/missing", verifyJWT, async (req, res, next) => {
  try {
    const stickers = await UserStickerService.getAllMissingByUser(req.user.id);
    res.status(statusCodes.success).json(stickers);
  } catch (error) {
    next(error);
  }
});

router.delete("/:number", verifyJWT, async (req, res, next) => {
  try {
    await UserStickerService.deleteByNumber(req.user.id, req.params.number);
    res.status(statusCodes.noContent).end();
  } catch (err) {
    next(err);
  }
});

router.get("/exchange/:user2Id", verifyJWT, async (req, res, next) => {
  try {
    const exchangePair = await UserStickerService.getExchangePair(
      req.user.id,
      req.params.user2Id
    );
    res.status(statusCodes.success).json(exchangePair);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
