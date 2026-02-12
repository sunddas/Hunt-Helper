const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const { type } = require('os');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true
    },
    password: {
    type: String,
    required: [true, "Please add a password"],
  },

},{timestamps:true});

userSchema.pre("save",async function (){
    if (!this.isModified("password"))
        return

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

})


userSchema.methods.matchPassword = async function (enteredpass) {
    return await bcrypt.compare(enteredpass,this.password)
}

const User = mongoose.model("User",userSchema);
module.exports = User;