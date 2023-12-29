const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/auth/sign-up", authController.signUp);
router.post("/auth/sign-in", authController.signIn);

module.exports = router;
