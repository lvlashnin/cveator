const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, resumeController.getAllResumes);
router.post('/', authMiddleware, resumeController.createResume);
router.get('/:id', authMiddleware, resumeController.getResumeById);
router.patch('/:id', authMiddleware, resumeController.updateResume);
router.delete('/:id', authMiddleware, resumeController.deleteResume);

module.exports = router;
