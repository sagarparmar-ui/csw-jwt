const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/courses', auth, userController.getCourses);
router.post('/courses/:courseId', auth, userController.purchaseCourse);
router.get('/purchasedCourses', auth, userController.getPurchasedCourses);

module.exports = router;
