const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require("../controllers/productcontroller");
const {isAuthenticationUser,autherizeRoles}= require("../middleware/auth");

const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticationUser ,autherizeRoles("admin"),createProduct);
// url same hai to multiple request you can add with same url
router.route("/product/:id")
.put(isAuthenticationUser ,autherizeRoles("admin"),updateProduct)
.delete(isAuthenticationUser ,autherizeRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticationUser,createProductReview);

module.exports = router;