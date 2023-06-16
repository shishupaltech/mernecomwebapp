const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productcontroller");

const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
// url same hai to multiple request you can add with same url
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;