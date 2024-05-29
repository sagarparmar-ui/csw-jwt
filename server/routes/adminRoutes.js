const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.post('/courses', auth, adminController.createCourse);
router.put('/courses/:courseId', auth, adminController.editCourse);
router.get('/courses', auth, adminController.getCourses);

module.exports = router;
