const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');

router.get('/', resumeController.getAllResumes);
router.post('/', resumeController.createResume);
router.get('/:id', resumeController.getResumeById);
router.patch('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
