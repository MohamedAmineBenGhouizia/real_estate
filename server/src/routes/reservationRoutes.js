const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect, admin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { reservationSchemas } = require('../validators/schemas');

router.post('/', protect, validate(reservationSchemas.create), reservationController.createReservation);
router.get('/my', protect, reservationController.getMyReservations);
router.get('/', protect, admin, reservationController.getAllReservations);
router.patch('/:id/status', protect, admin, validate(reservationSchemas.updateStatus), reservationController.updateReservationStatus);
router.post('/:id/request-modification', protect, reservationController.requestModification);
router.post('/:id/approve-modification', protect, admin, reservationController.approveModification);
router.post('/:id/reject-modification', protect, admin, reservationController.rejectModification);

module.exports = router;
