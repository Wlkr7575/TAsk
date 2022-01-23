const mongoose = require('mongoose')
const HR=  mongoose.Schema({
    userid:{type:mongoose.Types.ObjectId,ref:'User'},
    jobid:{type:mongoose.Types.ObjectId,ref:'Job'},
    createdAt:{type:Date,defaul:new Date()}
})
module.exports = mongoose.model('HR',HR)