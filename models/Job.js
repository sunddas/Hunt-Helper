const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    position:{
        type:String,
        required:[true,"Please enter the position/role"],
    },
    company:{
        type:String,
        required:[true,"Please enter the company name"],
    },
    status:{
        type:String,
        enum:["Applied","Interviewed","Offered","Rejected","Pending"],
        default:"Pending"
    },
    location:{
        type :String,
        default:"remote",
    },
    salary:{
        type:Number,
        default:0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

const Job = mongoose.model("Job",jobSchema);

module.exports = Job;