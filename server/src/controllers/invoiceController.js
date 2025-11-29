const Invoice = require('../models/Invoice');
const Reservation = require('../models/Reservation');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private (Admin)
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll({
            include: [Reservation]
        });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private (Admin/Client)
exports.getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id, {
            include: [Reservation]
        });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check if user is authorized (Admin or owner of reservation)
        // Simplified check:
        // if (req.user.role !== 'admin' && invoice.Reservation.userId !== req.user.id) ...

        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
