const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', async function(next) {
    const admin = this;
    if(!admin.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    next();
});

adminSchema.methods.comparePassword = function(password) {
    return bcrypt.methods.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
