const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');

router.post('/', educationController.createEducation);
router.patch('/:id', educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);

module.exports = router;
