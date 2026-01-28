const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience.controller');

router.post('/', experienceController.createExperience);
router.patch('/:id', experienceController.updateExperience);
router.delete('/:id', experienceController.deleteExperience);

module.exports = router;
