const express = require('express');
const router = express.Router();
const timelogController = require('../controllers/timelogController');

router.post('/newlog', timelogController.createTimeLog);

router.post('/loglist', timelogController.listTimeLog);

router.post('/loglist/:id', timelogController.listTimeLogById);

module.exports = router;