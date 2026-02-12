const express = require("express");
const router = express.Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

function genToken(id){
    return jwt.sign({id},process.env.JWTsecret,{expiresIn:"30d"})
}

router.post("/register",async (req,res)=>{

    const {name,email,password} = req.body;

    if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please provide all fields" });
}


    try{
        const exist = await User.findOne({email})
        if(exist) return res.status(400).json({msg:"user already exist"})

        const user = await User.create({
            name,email,password
        })

        return res.status(201).json({
            _id: user._id,
            email:user.email,
            name:user.name
        })

    }catch(e){
        res.status(500).json({msg:"internal server error",error:e.message })
    }
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    if ( !email || !password) {
    return res.status(400).json({ msg: "Please provide all fields" });
}

    try{
        user = await User.findOne({email})

        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({msg:"invalid credentials"})
        
        res.status(200).json({
            _id: user._id,
            email:user.email,
            name:user.name,
            token:genToken(user._id)
        })
        

    }catch(e){
        return res.status(500).json({msg:"internal serer eror",error:e.message })
    }
})

module.exports = router