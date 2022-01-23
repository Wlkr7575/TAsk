const User = require('../db/model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const create = async(req,res)=>{
    console.log('ok')
    const body = req.body
    const file = req.file
    const hashedPassword =  await bcrypt.hash(body.password,12)
    const newUser = new User({...body,mycv:file.originalname,password:hashedPassword})
    const token = jwt.sign({email:newUser.email,id:newUser._id},'test',{expiresIn:"12h"})
    await newUser.save()
    res.status(200).json({message:'created successfully',token})
}
const login  = async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user)return res.status(400).json({message:`No user with this email:${email}`})
    const correctPassword = await bcrypt.compare(password,user.password)
    if(!correctPassword) return res.status(400).json({message:`Incorrect Password`})
    const token = jwt.sign({email:user.email,id:user._id},'test',{expiresIn:'12h'})
    res.status(200).json({message:'User logged in successfully',user,token})
}
const read = async (req,res)=>{
    const token = req.body.token
    const data = jwt.decode(token)
    console.log(data)
    const user = await User.findById(data.id)
    res.status(200).json(user)
}
const update = async (req,res)=>{
    const {id} = req.params
    const body = req.body
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(400).send('no post with this id')
    await User.findByIdAndUpdate(id,{ ...body,id},{new:true})    
    res.json({message:'User updated successfully'})
}
const user = {
    create,login,read,update
}
module.exports = user