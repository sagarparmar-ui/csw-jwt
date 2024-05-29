const Admin = require('../models/admin');
const Course = require('../models/course');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.json({
        message:'Admin Created Successfully'
    });
};

exports.login = async (req, res) => {
    const { username, password} = req.headers;
    const admin = await Admin.findOne({ username });
    if(!admin || (await admin.comparePassword(password))) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    const token = jwt.sign({ id: admin._id}, 'your_jwt_secret');
    res.json({
        message: 'Logged in successfully', token
    });
};

exports.createCourse = async (req, res) => {
    const { title, description, price, imageLink, published } = req.body;
    const course = new Course({ title, description, price, imageLink, published });
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course._id });
};

exports.editCourse = async (req, res) => {
    const { courseId } = req.params;
    const { title, description, price, imageLink, published } = req.body;
    await Course.findByIdAndUpdate(courseId, { title, description, price, imageLink, published });
    res.json({ message: 'Course updated successfully' });
};

exports.getCourses = async (req, res) => {
    const courses = await Course.find();
    res.json({ courses });
};