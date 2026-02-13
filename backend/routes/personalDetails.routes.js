const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const personalDetailsController = require('../controllers/personalDetails.controller');

// router.post('/', personalDetailsController.createPersonalDetails);
// router.get('/:id', personalDetailsController.getPersonalDetails);
// router.patch('/:id', personalDetailsController.updatePersonalDetails);
// router.delete('/:id', personalDetailsController.deletePersonalDetails);
router.patch('/', authMiddleware, personalDetailsController.updatePersonalDetails);
router.get('/', authMiddleware, personalDetailsController.getPersonalDetails);

module.exports = router;
