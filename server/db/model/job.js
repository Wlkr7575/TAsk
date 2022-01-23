const mongoose = require('mongoose')
const Job = mongoose.Schema({
    jobname:{type:String,require:true},
    aboutjob:{type:String,require:true},
    pushiledAt:{type:Date,default:new Date()},
    expiryAt:{type:Date,default:new Date()},
    senior:{type:mongoose.Types.ObjectId,require:true,ref:'Admin'}
})
module.exports = mongoose.model('Job',Job)