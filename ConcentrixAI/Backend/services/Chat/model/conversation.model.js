import mongoose from "mongoose"

const ConversationSchema=new mongoose.Schema({
    title:{
        type:String,
        default:"New Chat"
    },

    userid:{
        type:String
    }
},{
    timestamps : true
})


const conversation = mongoose.model("conversation",ConversationSchema)
export default conversation