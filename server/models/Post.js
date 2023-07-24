const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { User, userSchema } = require('./User');

const postSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: User, required: true },

    title: { type: String, required: true },
    body: String,
    imgList: [String],
    tags: [String],

}, { timestamps: true });

const Post = mongoose.model('post', postSchema);

module.exports = { Post, postSchema };