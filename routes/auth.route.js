const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getMe);
router.post("/logout", authController.logout);

module.exports = router;