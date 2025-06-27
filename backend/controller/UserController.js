const User = require('../models/user')

module.exports.getAllUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        if(users.length===0 || !users){
            return res.status(200).json({message: "Users not here . "});
            console.log("dskasfkj");
        }
        return res.status(200).json({users: users});
    }catch(error){
        console.log()
        res.status(400).json({message: "Internal server error ."});
    }
}

module.exports.updateUser = async (req,res)=>{
    
}