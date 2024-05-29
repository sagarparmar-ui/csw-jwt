const User = require('../models/user');
const Course = require('../models/course');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({
        message: 'User created successfully' 
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ 
            message: 'Invalid credentials' 
        });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ 
        message: 'Logged in successfully', token 
    });
};

exports.getCourses = async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses });
};

exports.purchaseCourse = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.purchasedCourses.push(courseId);
    await user.save();
    res.json({ 
        message: 'Course purchased successfully' 
    });
};

exports.getPurchasedCourses = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('purchasedCourses');
    res.json({ purchasedCourses: user.purchasedCourses });
};
