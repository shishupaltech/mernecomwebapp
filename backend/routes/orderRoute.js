const express = require("express");
const { isAuthenticationUser, autherizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrder, updateOrder, deleteOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();
router.route("/order/new").post(isAuthenticationUser,newOrder);
router.route("/order/:id").get(isAuthenticationUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticationUser,myOrder);
router.route("/admin/orders").get(isAuthenticationUser,autherizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticationUser,autherizeRoles("admin"),updateOrder)  
.delete(isAuthenticationUser,autherizeRoles("admin"),deleteOrder);

module.exports = router;