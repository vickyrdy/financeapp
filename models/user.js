const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash all user data before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('username') && !this.isModified('email') && !this.isModified('password')) return next();
    
    this.username = await bcrypt.hash(this.username, 10);
    this.email = await bcrypt.hash(this.email, 10);
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

// Method to compare hashed data (useful for login and other comparisons)
UserSchema.methods.compareHashedData = function (candidateData, actualData) {
    return bcrypt.compare(candidateData, actualData);
};

module.exports = mongoose.model('User', UserSchema);
