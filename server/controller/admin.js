const Admin = require('../db/model/admin')
const Job = require('../db/model/job')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const get = async(req,res)=>{
    const {email,password} =req.body
    console.log(req.body)
    const admin = await Admin.findOne({email})
    if(!admin)return res.status(400).json({message:`No user with this email:${email}`})
    const correctPassword = await bcrypt.compare(password,admin.password)
    if(!correctPassword) return res.status(400).json({message:`Incorrect Password`})
    const admintoken = jwt.sign({email:admin.email,id:admin._id},'test',{expiresIn:"12h"})
    res.status(200).json({message:'Admin logged in successfully',admin,admintoken})
}
const create = async (req,res)=>{
    const body = req.body
    const hashedPassword =  await bcrypt.hash(body.password,12)
    const newAdmin = new Admin({...body,password:hashedPassword})
    const token = jwt.sign({email:newAdmin.email,id:newAdmin._id},'test',{expiresIn:"12h"})
    await newAdmin.save()
    res.status(200).json({message:'created successfully',newAdmin,admintoken:token})
}
const read = async (req,res)=>{
    const token = req.body.token
    const data = jwt.decode(token)
    const user = await Admin.findById(data.id)
    res.status(200).json(user)
}
const addJob = async (req,res)=>{
    const body  =req.body
    const newJob = new Job({...body})
    await newJob.save()
    res.status(200).json({message:'Job pusblished successfully'})
}
const readJob = async(req,res)=>{
    const joblist = await Job.find()
    res.status(200).json({joblist})
}
const readJobbyPublisher = async (req,res)=>{
    const {id} = req.params
    const jobs = await Job.find({senior:id})
    res.status(200).json({jobs})
}
const readbyId= async (req,res)=>{
    const {id} = req.params
    const job = await Job.findById(id).populate({path:'senior',select:['firstname','lastname']})
    res.json({job})
}
const admin = {
    create,get,read,
    addJob,readJob,readJobbyPublisher,
    readbyId
}
module.exports = admin