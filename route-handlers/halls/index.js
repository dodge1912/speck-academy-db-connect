const express = require('express');
const hallsController = require('./controller');
const router = new express.Router();

router.route('/').get(hallsController.getHalls);
router.route('/:hall_uid').get(hallsController.getHallById);
router.route('/create').post(hallsController.createHall);
router.route('/update/:hall_uid').put(hallsController.updateHall);
router.route('/delete/:hall_uid').delete(hallsController.deleteHall);


module.exports = router;