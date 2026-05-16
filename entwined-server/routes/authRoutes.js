const express = require("express");
const {
  signup,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  refreshTokenHandler,
  logout,
  logoutAll,
  googleLogin,
  verifyToken
} = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests, please try again later."
});

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", limiter, login);
router.post("/google", googleLogin);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/refresh", refreshTokenHandler);
router.post("/logout", logout);
router.post("/logout-all", authMiddleware, logoutAll);
router.get("/verify-token", authMiddleware, verifyToken);

module.exports = router;