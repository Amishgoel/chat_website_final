import mongoose from "mongoose";
const usermodel =new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    Username:{
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },  
    ProfilePhoto:{
        type: String,
        default: "",
    },
    Gender:{
        type: String,
        enum:["male","female"],
        required: true,
    }
},{timestamps: true});
export const User= mongoose.model("User",usermodel);
