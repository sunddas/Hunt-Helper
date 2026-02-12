const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = async (req,res,next) => {
    let token;
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
    try{
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWTsecret);
        req.user = await User.findById(decoded.id).select("-password");
    }catch(e){
        res.status(401).json({message:"authorization failed"})
        }
   }

   if(!token){
    res.status(401).json({message:"authorization failed, no token"})
   }
}


module.exports = {protect}