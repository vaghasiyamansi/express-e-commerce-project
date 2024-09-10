const express = require("express");
const userRoutes = express.Router();
const {
    registerUser,
    loginUser,
    getAllUser,
    updateProfile,
    deleteUser
    
} = require("../controller/user.controller");
const {verifyToken} = require("../helpers/tokenVerify");

userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser);
userRoutes.get("/",getAllUser);
userRoutes.put("/update-profile",verifyToken,updateProfile);
userRoutes.delete("/delete-user",verifyToken,deleteUser);

module.exports = userRoutes;