const router = require("express").Router();
const StickerService = require("../services");
const {
  verifyJWT,
  checkRole,
} = require("../../../middlewares/auth-middlewares");
const statusCodes = require("../../../../constants/statusCodes.js");

//Cria uma figurinha pelo número dela
router.post("/:id", verifyJWT, async (req, res, next) => {
  try {
    await StickerService.create(req.body, req.params.number);
    res.status(statusCodes.created).end();
  } catch (error) {
    next(error);
  }
});

//Get all figurinhas
router.get("/", verifyJWT, async (req, res, next) => {
  try {
    const stickers = await StickerService.getAll();
    res.status(statusCodes.success).json(stickers);
  } catch (error) {
    next(error);
  }
});

//Get figurinha by id
router.get("/:id", verifyJWT, async (req, res, next) => {
  try {
    const sticker = await StickerService.getById(req.params.id);
    res.status(statusCodes.success).json(sticker);
  } catch (error) {
    next(error);
  }
});

//Update figurinha
router.put("/:id", verifyJWT, async (req, res, next) => {
  try {
    await StickerService.update(req.params.id, req.body);
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

//Delete Figurinha
router.delete("/:id", verifyJWT, async (req, res, next) => {
  try {
    await StickerService.delete(req.params.id);
    res.status(statusCodes.noContent).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
