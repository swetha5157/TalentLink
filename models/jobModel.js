import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    company:String,
    position:String,
    jobStatus:{
        type:String,
        enum:['interview','pending','declined'],
        default:'pending'
    },
    jobType:{
        type:String,
        enum:['full-time','part-time','internship'],
        default:'full-time'
    },
    jobLocation:{
        type:String,
        default:'my city',
    },

},{timestamps:true});
export default mongoose.model('Job',jobSchema);