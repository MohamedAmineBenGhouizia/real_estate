const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, paymentController.createPayment);

module.exports = router;
