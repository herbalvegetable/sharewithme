const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    
    username: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    img: String,

}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = { User, userSchema };