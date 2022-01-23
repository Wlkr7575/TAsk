const mongoose = require('mongoose')
const User=  mongoose.Schema({
    email:{type:String,require:true,null:false},
    password:{type:String,require:true,null:false},
    lastname:{type:String,require:true},
    firstname:{type:String,require:true},
    phonenumber:{type:Number,require:true},
    aboutme:{type:String,require:true},
    mycv:{type:String,reuqire:true}
})
module.exports = mongoose.model('User',User)