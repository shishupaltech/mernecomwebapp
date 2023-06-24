const express = require("express");
const { isAuthenticationUser } = require("../middleware/auth");
const { newOrder } = require("../controllers/orderController");

const router = express.Router();
router.route("/order/new").post(isAuthenticationUser,newOrder);

module.exports = router;