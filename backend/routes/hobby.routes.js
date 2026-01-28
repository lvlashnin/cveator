const express = require('express');
const router = express.Router();
const hobbyController = require('../controllers/hobby.controller');

router.post('/', hobbyController.createHobby);
router.patch('/:id', hobbyController.updateHobby);
router.delete('/:id', hobbyController.deleteHobby);

module.exports = router;
