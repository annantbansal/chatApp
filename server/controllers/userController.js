import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/cloudinary.js";
//signup
export const signup=async(req,res)=>{
    const {fullName,email,password,bio}=req.body;
    try {
        if(!fullName||!email||!password||!bio){
            return res.status(400).json({
                success:false,
                message:'ALL FIELDS ARE REQUIRED'
            });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:'USER ALREADY EXISTS'
            })
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({fullName,email,password:hashedPassword,bio});
        const token=generateToken(newUser._id);
        return res.status(200).json({
            success:true,
            userData:newUser,
            token,
            message:"Account Created Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//login
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({
                success:false,
                message:'NO SUCH USER FOUND'
            })
        }
        const isPasswordCorrect=await bcrypt.compare(password,userData.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:"INVALID CREDENTIALS"
            })
        }
        const token=generateToken(userData._id);
        return res.status(200).json({
            success:true,
            userData,
            token,
            message:"LOGIN SUCCESSFUL"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//contrroller to check user is authenticated or not
export const checkAuth=async(req,res)=>{
    res.json({success:true,user:req.user});
}
//controller to update user profile details
export const updateProfile=async(req,res)=>{
    try {
        const {profilePic,bio,fullName}=req.body;
        const userId=req.user._id;
        let updatedUser;
        if(!profilePic){
            updatedUser=await User.findByIdAndUpdate(userId,{bio,fullName},{new:true});
        }else{
            const upload=await cloudinary.uploader.upload(profilePic);
            updatedUser=await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true});
        }
        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            user:updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}