const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/auth/getProduct", productController.getProduct);
router.post("/auth/createProduct", productController.createProduct);
router.post("/auth/editProduct", productController.editProduct);
router.post("/auth/deleteProduct", productController.deleteProduct);

module.exports = router;
