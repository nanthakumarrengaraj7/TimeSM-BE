const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/getProject', projectController.getProject);
router.get('/getProjectById/:id', projectController.getProjectById);
router.post('/create', projectController.createProject);
router.post('/assignUser', projectController.assignUser);
router.post('/assignTasks', projectController.assignTask);
router.put('/update/:id', projectController.editProject);
router.delete('/delete/:id', projectController.deleteProject);

module.exports = router;