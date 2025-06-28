import mongoose from "mongoose";
const messagemodel = new mongoose.Schema({
    SenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ReceiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Message: {
        type: String,
        required: true,
    }
},{timestamps: true});
export const Message = mongoose.model("Message", messagemodel);