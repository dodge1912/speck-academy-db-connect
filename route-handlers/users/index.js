const express = require('express');
const usersController = require('./controller');
const router = new express.Router();

router.route('/').get(usersController.getUsers);
router.route('/:user_uid').get(usersController.getUserById);
router.route('/create').post(usersController.createUser);
router.route('/update/:user_uid').put(usersController.updateUser);
router.route('/delete/:user_uid').delete(usersController.deleteUser);

module.exports = router;