const express = require('express');
const router = express.Router();
const languageController = require('../controllers/language.controller');

router.post('/', languageController.createLanguage);
router.patch('/:id', languageController.updateLanguage);
router.delete('/:id', languageController.deleteLanguage);

module.exports = router;
