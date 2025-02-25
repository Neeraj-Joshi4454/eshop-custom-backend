import User from '../models/userModel.js';

export const getAllUsers = async(req, res) => {
    try{
        const users = await User.find()
        const count = await User.countDocuments();
        if(!users) return res.status(404).json({message : "Users not found/"})
        return res.status(200).json({success:true, users, count})
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}