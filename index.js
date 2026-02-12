const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const { connecttodb } = require("./connection");
const authRoute = require("./routes/auth")
//connect to db
connecttodb(process.env.mongoURI);

app.use(express.json());

app.use("/auth",authRoute)

app.get("/",(req,res)=>{
    res.send("acha ji aesa he kia")
})
app.listen(PORT,()=>{
    console.log(`server conn at  ${PORT}`)
})
