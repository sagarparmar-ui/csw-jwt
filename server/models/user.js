const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.methods.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
