const express = require('express');
const hallsController = require('./controller');
const router = new express.Router();

router.route('/').get(hallsController.getHalls);

module.exports = router;