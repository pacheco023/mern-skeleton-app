import mongoose from "mongoose";

const  CommentSchema = new mongoose.Schema([{
    text: {
        type: String,
        trim: true,
        required: 'text required'
    },

    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post'
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },


    salt: String,
  like: {type: mongoose.Schema.ObjectId, ref: 'User'}
}]);

export default mongoose.model('Comment', CommentSchema);  