const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique:true
    },
    email:
    {
        type: String,
        required: true,
        unique:true,
        lowercase: true
    },
    password:
    {
        type: String,
        required: true,
    },
    profilePic:
    {
        type: String,
        default: ''
    },
    isAdmin:
    { 
        type: Boolean, 
        default: false 
    },
    products:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
},{ timestamps: true });

module.exports = mongoose.model('User',UserSchema);