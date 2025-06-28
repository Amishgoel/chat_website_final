import mongoose from "mongoose";
const conversationmodel = new mongoose.Schema({
    Participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    Messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
},{timestamps: true});
export const Conversation = mongoose.model("Conversation", conversationmodel);