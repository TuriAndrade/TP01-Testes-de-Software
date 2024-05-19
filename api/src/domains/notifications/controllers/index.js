const router = require("express").Router();
const NotificationService = require("../services");
const {
  verifyJWT,
  checkRole,
} = require("../../../middlewares/auth-middlewares");
const statusCodes = require("../../../../constants/statusCodes.js");

router.get("/", verifyJWT, async (req, res, next) => {
  try {
    const notifications = await NotificationService.getAllToUser(req.user.id);
    res.status(statusCodes.success).json(notifications);
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyJWT, async (req, res, next) => {
  try {
    await NotificationService.create({
      from: req.user.id,
      ...req.body,
    });
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
