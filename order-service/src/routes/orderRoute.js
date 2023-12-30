const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/auth/get-order", orderController.getOrder)
router.post("/auth/create-order", orderController.createOrder);

module.exports = router;
