const express = require('express');
const router = express.Router();
const {
    createReservation,
    getMyReservations,
    getAllReservations,
    updateReservationStatus
} = require('../controllers/reservationController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/', protect, createReservation);
router.get('/my', protect, getMyReservations);
router.get('/', protect, admin, getAllReservations);
router.patch('/:id/status', protect, admin, updateReservationStatus);

module.exports = router;
