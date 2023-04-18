const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true },
    body: String,
    imgList: [String],
    tags: [String],
}, { timestamps: true });

const Post = mongoose.model('post', postSchema);

module.exports = { Post, postSchema };