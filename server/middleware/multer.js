const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){

        const allowType=['image/png','image/jpg','image/jpeg']
        if(!allowType.includes(file.mimetype)){
          return  cb(new Error('This format is not supported'))
        }
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '-'+ file.originalname )
    }
})


module.exports={storage,multer}