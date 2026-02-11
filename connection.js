const mongoose = require("mongooose");


async function connecttodb(mongoURL) {
    try{
            await mongoose.connect(mongoURL);
            console.log("connected to db");
    }catch(err){
        console.log("error in connecting to db",err);
        process.exit(1); 
    }
}

module.exports = { connecttodb};