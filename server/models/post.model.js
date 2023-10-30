import mongoose  from "mongoose";

const PostSchema = new mongoose.Schema([{
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    description: {
        type: String,
        trim: true,
        minilenght: 25,
        maxlength: 250,
        required: 'Description is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    salt: String,
    like:[{type: mongoose.Schema.ObjectId,ref: 'User'}],
    comment:[{type: mongoose.Schema.ObjectId,ref: 'post'}]
}]);


export default mongoose.model('Post', PostSchema);