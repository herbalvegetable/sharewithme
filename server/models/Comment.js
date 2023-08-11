const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { User, userSchema } = require('./User');

const commentSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: User, required: true },

    text: { type: String, required: true },
    likedUsers: [{ type: Schema.Types.ObjectId, ref: User }],
    replies: [{type: Schema.Types.ObjectId, ref: this}]

}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);

module.exports = { Comment, commentSchema };