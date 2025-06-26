const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },   
    title:
    {
        type:String,
        required: true
    },
    description:
    {
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required: true
    },
    category:
    {
        type:String,
        required: true
    },
    countInStock:
    {
        type:Number,
        required: true
    },
    rating:
    {
        type: Number,
        default: 0
    },
    image:
    {
        type: String,
        default: ''
    },
    numReviews:
    {
        type: Number,
        default: 0
    }
},{ timestamps: true });

module.exports = mongoose.model('Product',ProductSchema);