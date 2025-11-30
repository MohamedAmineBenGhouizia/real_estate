const paymentService = require('../services/paymentService');
const { Invoice } = require('../models');

const createPayment = async (req, res) => {
    try {
        const { invoiceId, source } = req.body;

        const invoice = await Invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        if (invoice.status === 'paid') {
            return res.status(400).json({ message: 'Invoice already paid' });
        }

        const paymentResult = await paymentService.processPayment(invoice.amount, 'USD', source);

        if (paymentResult.success) {
            invoice.status = 'paid';
            await invoice.save();
            return res.json({ message: 'Payment successful', transactionId: paymentResult.transactionId });
        } else {
            return res.status(400).json({ message: 'Payment failed' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createPayment,
};
