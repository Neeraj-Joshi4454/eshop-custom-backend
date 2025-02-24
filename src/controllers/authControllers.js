import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try{
        const {first_name , last_name , email , password} = req.body;
        if(!first_name || !last_name || !email || !password){
            return res.json({message : "All fields are required"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({first_name, last_name, email, password:hashedPassword});
        return res.json({success:true, user : newUser});
    }catch(error){
        return res.status(500).json({success: false , error:error.message});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message : "User not found"});
        const isMatch = await bcrypt.compare(password, user?.password)
        if(!isMatch) return res.status(401).json({message : "Incorrect Password"});
        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return res.json({token, userId:user._id, userRole:user.role, name:`${user.first_name + " " + user.last_name}`});
    }catch(error){
        return res.status(500).json({success: false, error:error.message})
    }
}