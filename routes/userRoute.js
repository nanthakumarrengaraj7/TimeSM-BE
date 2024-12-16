const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/list', userController.getUser);
router.post('/add', userController.addUser);
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/findone/:id', userController.getUserById);

module.exports = router;