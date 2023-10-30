import mongoose  from "mongoose";
import crypto from 'crypto';


const ProductSchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    price: {
        type: Number,
        trim: true,
        required: 'Price required'
    },
    stock: {
        type: Number,
        trim: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: 'Category requerida'
      },
    created: {
        type: Date,
        default: Date.now
      },
      

}]);
export default mongoose.model('Product', ProductSchema);