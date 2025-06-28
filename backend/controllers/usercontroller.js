import {User} from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {

    try
    {
        const { FullName, Username, Password, ConfirmPassword,Gender } = req.body;
        if (!FullName ||  !Username || !Password || !ConfirmPassword||!Gender){
            return res.status(400).json({ message: "All fields are required" });
        }
        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await User.findOne({ Username});
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const maleProfilePhoto=`https://avatar.iran.liara.run/public/boy?username=${Username}`;
        const femaleProfilePhoto=`https://avatar.iran.liara.run/public/girl?username=${Username}`;
        await User.create({
            FullName,
            Username,
            Password:hashedPassword,
            ProfilePhoto:Gender==="male" ? maleProfilePhoto : femaleProfilePhoto,
            Gender,
    });
    return res.status(201).json({ 
        message: "User registered successfully",
        success: true,
     });
    } catch (error) {
        console.log(error);
    }
}
export const login= async (req, res) => {
    try {
        const {Username, Password}=req.body;
    
    if (!Username || !Password){
        return res.status(400).json({ message: "All fields are required" });

    };
 
const user=await User.findOne({Username});

if (!user){
    return res.status(400).json({ 
        message: "User not found",
        success: false
    })

};
const isPasswordMatch = await bcrypt.compare(Password, user.Password);
if (!isPasswordMatch) {
    return res.status(400).json({ 
        message: " password incorrect ",
        success: false
    })
} ;
    const tokenData = {
        userId:user._id
    }
    const token=await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
    return res.status(200).cookie("token",token,{maxage:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        _id: user._id,
            Username: user.Username,
            FullName: user.FullName,
            ProfilePhoto: user.ProfilePhoto
    });
    
}catch (error) {
        console.log(error);
    }
}
export const logout =  (req,res) =>{
    try{
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logged out successfully",
        });
    }
    catch(error){
        console.log(error);
    }

}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers=await User.find({ _id: { $ne: loggedInUserId } }).select("-Password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
} 
