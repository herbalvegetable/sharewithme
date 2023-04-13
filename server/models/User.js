const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},

}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = { User, userSchema };