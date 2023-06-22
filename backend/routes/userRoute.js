const express = require("express");
const { registerUser, loginUser, logout,forgatPasswrod, resetPassword, getUserDetails, updatePassword } = require("../controllers/userController");
const {isAuthenticationUser,autherizeRoles} = require("../middleware/auth");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgatPasswrod);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logout);
router.route("/me").get(isAuthenticationUser,getUserDetails);
router.route("/password/update").put(isAuthenticationUser,updatePassword);

module.exports = router;