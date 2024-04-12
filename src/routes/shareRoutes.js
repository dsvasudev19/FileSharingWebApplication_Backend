const router = require('express').Router();
const {sharedUpload}=require("./../utils/multer")
const userAuthMiddleware=require("./../middlewares/userAuthMiddleware")

router.post("/",[userAuthMiddleware], sharedUpload.single('file'),(req,res,next)=>{
    console.log(req.body);
    console.log(req.file);

    res.status(200).json({success:true,message:"Successfully uploaded"})
})

module.exports = router;