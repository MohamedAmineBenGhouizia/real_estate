const Invoice = require('../models/Invoice');
const Reservation = require('../models/Reservation');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private (Admin)
exports.getAllInvoices = async (req, res) => {
    try {
        const User = require('../models/User');
        const invoices = await Invoice.findAll({
            include: [{
                model: Reservation,
                include: [User]
            }]
        });
        res.json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
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
// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private (Admin)
exports.createInvoice = async (req, res) => {
    try {
        const { reservationId, amount, status, dueDate } = req.body;

        const reservation = await Reservation.findByPk(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        const invoice = await Invoice.create({
            reservationId,
            amount,
            status: status || 'unpaid',
            dueDate
        });

        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private (Admin)
exports.updateInvoice = async (req, res) => {
    try {
        const { amount, status, dueDate } = req.body;
        const invoice = await Invoice.findByPk(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        invoice.amount = amount || invoice.amount;
        invoice.status = status || invoice.status;
        invoice.dueDate = dueDate || invoice.dueDate;

        await invoice.save();

        res.json(invoice);
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private (Admin)
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        await invoice.destroy();
        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
