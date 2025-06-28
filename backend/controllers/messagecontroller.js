import {Conversation} from '../models/conversationmodel.js';
import {Message} from '../models/messagemodel.js';
export const sendMessage = async (req, res) => {
    try{
        const senderId=req.id;
        const receiverId=req.params.id;
        const {message} = req.body;
        let gotConversation =await Conversation.findOne({
            Participants:{$all :[senderId,receiverId]},
        });
        if (!gotConversation){
            gotConversation=await Conversation.create({
                Participants:[senderId,receiverId],
            })
        };
        const newMessage =  await Message.create({
            SenderId:senderId,
            ReceiverId:receiverId,
            Message:message

        });
        if (newMessage){
            gotConversation.Messages.push(newMessage._id);
        };
        await gotConversation.save();
        // SOCKET IO
        return res.status(201).json({
           newMessage
        });
    }
    catch(error){
        console.log(error);}
}
export const getMessage = async (req, res) => {
    try{
        const receiverId=req.params.id;
        const senderId=req.id;
        const conversation=await Conversation.findOne({
            Participants:{$all :[senderId,receiverId]},
        }).populate("Messages");
        return res.status(200).json(conversation?.Messages);
    }
    catch(error){
        console.log(error);
    }
}