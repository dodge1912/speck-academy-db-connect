const express = require('express');
const reservationsController = require('./controller');
const router = new express.Router();

router.route('/').get(reservationsController.getReservations);
router.route('/:reservation_uid').get(reservationsController.getReservationById);
router.route('/create').post(reservationsController.createReservation);
router.route('/update/:reservation_uid').put(reservationsController.updateReservations);
router.route('/delete/:reservation_uid').delete(reservationsController.deleteReservations);

module.exports = router;