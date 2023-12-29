const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/create-order', orderController.createOrder);

module.exports = router;
