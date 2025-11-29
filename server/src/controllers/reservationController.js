const Reservation = require('../models/Reservation');
const Property = require('../models/Property');
const Invoice = require('../models/Invoice');

// @desc    Create reservation
// @route   POST /api/reservations
// @access  Private (Client)
exports.createReservation = async (req, res) => {
    try {
        const { propertyId, startDate, endDate } = req.body;

        const property = await Property.findByPk(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check availability (simplified logic)
        // In a real app, check if dates overlap with existing confirmed reservations

        const reservation = await Reservation.create({
            userId: req.user.id,
            propertyId,
            startDate,
            endDate
        });

        // Create Invoice automatically
        // Calculate days
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Ensure at least 1 day
        const days = diffDays > 0 ? diffDays : 1;
        const amount = property.price * days;

        await Invoice.create({
            reservationId: reservation.id,
            amount
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my reservations
// @route   GET /api/reservations/my
// @access  Private (Client)
exports.getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            where: { userId: req.user.id },
            include: [Property, Invoice]
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private (Admin)
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [Property, Invoice] // Include User if needed
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update reservation status
// @route   PATCH /api/reservations/:id/status
// @access  Private (Admin)
exports.updateReservationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const reservation = await Reservation.findByPk(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        reservation.status = status;
        await reservation.save();

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
