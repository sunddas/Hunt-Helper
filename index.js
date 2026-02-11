const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT | 5000;
dotenv.config();
const mongoose = require("mongoose");

app.get("/",(req,res)=>{
    res.send("acha ji aesa he kia")
})
app.listen(PORT,()=>{
    console.log("server conn at 5000")
})
