const { User, Property, Reservation, Invoice } = require('../models');
const { Op } = require('sequelize');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalProperties = await Property.count();
        const activeReservations = await Reservation.count({
            where: { status: 'confirmed' }
        });

        // Calculate total revenue from paid invoices
        const paidInvoices = await Invoice.findAll({
            where: { status: 'paid' },
            attributes: ['amount']
        });
        const totalRevenue = paidInvoices.reduce((acc, inv) => acc + parseFloat(inv.amount), 0);

        // Get recent activity (last 5 reservations)
        const recentActivity = await Reservation.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [
                { model: User, attributes: ['firstName', 'lastName', 'email'] },
                { model: Property, attributes: ['title'] }
            ]
        });

        res.json({
            totalUsers,
            totalProperties,
            activeReservations,
            totalRevenue,
            recentActivity
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
