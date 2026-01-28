const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const resumeRoutes = require('./resume.routes');
const skillRoutes = require('./skill.routes');
const educationRoutes = require('./education.routes');
const experienceRoutes = require('./experience.routes');
const languageRoutes = require('./language.routes');
const personalDetailsRoutes = require('./personalDetails.routes');
const hobbyRoutes = require('./hobby.routes');

router.use('/users', userRoutes);
router.use('/experiences', experienceRoutes);
router.use('/educations', educationRoutes);
router.use('/languages', languageRoutes);
router.use('/hobbies', hobbyRoutes);
router.use('/skills', skillRoutes);
router.use('/resumes', resumeRoutes);
router.use('/personal-details', personalDetailsRoutes);

module.exports = router;
