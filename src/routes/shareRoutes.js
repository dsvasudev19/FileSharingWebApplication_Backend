const router = require('express').Router();
const {sharedUpload}=require("./../utils/multer")
const userAuthMiddleware=require("./../middlewares/userAuthMiddleware")
const {Share}=require('./../models')

router.post("/",[userAuthMiddleware], sharedUpload.single('file'),(req,res,next)=>{
    
    res.status(200).json({success:true,message:"Successfully uploaded"})
})

module.exports = router;