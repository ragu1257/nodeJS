const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: [true, "please add user name"]
  },
  email:{
    type: String,
    required:[true, "please add email"],
    unique: [true, "email address already exist"]
  },
  password:{
    type: String,
    required: [true, "please add password"]
  }
},
{
  timestamps: true
})

module.exports = mongoose.model("User", userSchema)