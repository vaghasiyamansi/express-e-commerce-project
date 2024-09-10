const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/user.services");
const userServices = new UserServices();


// Registration
exports.registerUser = async(req,res) =>{
    try {
        let user = await User.findOne({email:req.body.email,isDelete:false});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        let hashPassword = await bcrypt.hash(req.body.password,10);
        // console.log(hashPassword);
        
        user = await User.create({...req.body,password:hashPassword});
        user.save();
        res.status(201).json({user,message:"User registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// Login User

exports.loginUser = async(req,res) => {
    try {
        let user = await userServices.user({email:req.body.email,isDelete:false});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        let matchPassword = await bcrypt.compare(req.body.password,user.password)
        if(!matchPassword){
            return res.status(404).json({message:"Email or Password not match"})
        }
        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(201).json({user,message:"Login Successful",token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// Get All Users
exports.getAllUser = async (req, res)=>{
    try{
        const users = await User.find();
        res.json(200),json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

// updateProfile
exports.updateProfile = async (req,res) =>{
    try {
       let user = req.user;
       user = await userServices.update(user._id, req.body);
       res.status(202).json({user,message:"User update success"}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// Delete User

exports.deleteUser = async(req,res) => {
    try {
        let user = req.user;
        user = await userServices.delete(
            user._id,
            {isDelete:true},
            {new:true}
        );
        res.status(202).json({user,message:"User Delete Success "})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}


