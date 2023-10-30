import mongoose from "mongoose";

const  CommentSchema = new mongoose.Schema([{
    text: {
        type: String,
        trim: true,
        required: 'text required'
    },

    salt: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
}]);

export default mongoose.model('Comment', CommentSchema);