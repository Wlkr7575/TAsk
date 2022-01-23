const HR = require('../db/model/hr')
const create =(req,res) =>{
    const body = req.body
    const newJob = HR({...body})
    newJob.save()
    res.status(200).send('your cv sended')
}
const hr = {
    create
}
module.exports = hr