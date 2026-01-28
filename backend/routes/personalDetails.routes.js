const express = require('express');
const router = express.Router();
const personalDetailsController = require('../controllers/personalDetails.controller');

// router.post('/', personalDetailsController.createPersonalDetails);
// router.get('/:id', personalDetailsController.getPersonalDetails);
// router.patch('/:id', personalDetailsController.updatePersonalDetails);
// router.delete('/:id', personalDetailsController.deletePersonalDetails);
router.patch('/:id', personalDetailsController.updatePersonalDetails);
router.get('/:id', personalDetailsController.getPersonalDetails);
router.delete('/:id', personalDetailsController.deletePersonalDetails);

module.exports = router;
