const express = require('express');
const router = express.Router();
const { getAllInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice } = require('../controllers/invoiceController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', protect, admin, getAllInvoices);
router.post('/', protect, admin, createInvoice);
router.get('/:id', protect, getInvoice);
router.put('/:id', protect, admin, updateInvoice);
router.delete('/:id', protect, admin, deleteInvoice);

module.exports = router;
