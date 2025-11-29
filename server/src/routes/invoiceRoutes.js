const express = require('express');
const router = express.Router();
const { getAllInvoices, getInvoice } = require('../controllers/invoiceController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', protect, admin, getAllInvoices);
router.get('/:id', protect, getInvoice);

module.exports = router;
