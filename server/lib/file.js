const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        var _dir = `./files/${req.body.email}`
        if(fs.existsSync(_dir)){
            cb(null,`./files/${req.body.email}`)
        }else{
            fs.mkdirSync(_dir,{ recursive: true })
            cb(null,`./files/${req.body.email}`)
        }
        
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    },
})
const upload = multer({storage:storage})
module.exports = upload