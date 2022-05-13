const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post(
  "/refresh",
  authMiddleware.verifyToken,
  authController.requestRefreshToken
);

module.exports = router;
