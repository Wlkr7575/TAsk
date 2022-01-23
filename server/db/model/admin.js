const mongoose = require('mongoose')
const Admin=  mongoose.Schema({
    email:{type:String,require:true,null:false},
    password:{type:String,require:true,null:false},
    lastname:{type:String,require:true},
    firstname:{type:String,require:true},
    admintype:{type:String,require:true}
})
module.exports = mongoose.model('Admin',Admin)