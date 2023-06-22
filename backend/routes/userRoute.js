const express = require("express");
const { registerUser, loginUser, logout,forgatPasswrod, resetPassword } = require("../controllers/userController");

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgatPasswrod);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logout);

module.exports = router;