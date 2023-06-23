const express = require("express");
const { registerUser, loginUser, logout,forgatPasswrod, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const {isAuthenticationUser,autherizeRoles} = require("../middleware/auth");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgatPasswrod);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logout);
router.route("/me").get(isAuthenticationUser,getUserDetails);
router.route("/password/update").put(isAuthenticationUser,updatePassword);
router.route("/me/update").put(isAuthenticationUser,updateProfile);

// admin routes for see the users and singl user data
router.route("/admin/users").get(isAuthenticationUser,autherizeRoles("admin"),getAllUser);
router.route("/admin/user/:id")
.get(isAuthenticationUser,autherizeRoles("admin"),getSingleUser)
.put(isAuthenticationUser,autherizeRoles("admin"),updateUserRole)
.delete(isAuthenticationUser,autherizeRoles("admin"),deleteUser);


module.exports = router;