const router = require("express").Router();
const UserService = require("../services/");
const {
  loginMiddleware,
  verifyJWT,
  notLoggedIn,
} = require("../../../middlewares/auth-middlewares.js");
const statusCodes = require("../../../../constants/statusCodes.js");

//Login
router.post("/login", notLoggedIn, loginMiddleware);

//Auth
router.get("/authenticate", verifyJWT, (req, res, next) => {
  try {
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

//Logout
router.post("/logout", verifyJWT, async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

//Cria User
router.post("/", async (req, res, next) => {
  try {
    await UserService.create(req.body);
    res.status(statusCodes.created).end();
  } catch (error) {
    next(error);
  }
});

//Get All Users
router.get("/", verifyJWT, async (req, res, next) => {
  try {
    const users = await UserService.getAll(req.user.id);
    res.status(statusCodes.success).json(users);
  } catch (error) {
    next(error);
  }
});

// Get User logado
router.get("/user", verifyJWT, async (req, res, next) => {
  try {
    if (req.user) {
      const user = await UserService.getById(req.user.id);
      res.status(statusCodes.success).json(user);
    }
  } catch (error) {
    next(error);
  }
});

//Get user by Id
router.get("/:id", verifyJWT, async (req, res, next) => {
  try {
    const user = await UserService.getById(req.params.id);

    res.status(statusCodes.success).json(user);
  } catch (error) {
    next(error);
  }
});

//Update User
router.put("/:id", verifyJWT, async (req, res, next) => {
  try {
    await UserService.update(req.params.id, req.body, req.user);
    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
});

//Delete User
router.delete("/:id", verifyJWT, async (req, res, next) => {
  try {
    await UserService.delete(req.params.id, req.user.id);
    res.status(statusCodes.noContent).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
