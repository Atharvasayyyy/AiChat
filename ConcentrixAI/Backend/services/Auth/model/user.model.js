import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  FirebaseUID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
    },
    avatar: {
    type: String,
    required: false
  },
},
{  timestamps: true
});

const User = mongoose.model("User", userschema);
export default User;