const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.post('/pva', dashboardController.pva);

router.post('/loglist', dashboardController.listTimeLog);

router.post('/loglist/:id', dashboardController.listTimeLogById);

module.exports = router;