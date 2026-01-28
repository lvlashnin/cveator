const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');

router.post('/', skillController.createSkill);
router.patch('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
