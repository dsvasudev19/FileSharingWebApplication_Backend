const router= require('express').Router();


const authRoutes=require('./authRoutes');
router.use('/auth',authRoutes);

const folderRoutes=require('./folderRoutes');
router.use('/folder',folderRoutes);

const fileRoutes=require('./fileRoutes');
router.use('/file',fileRoutes);

const userRouter=require("./userRoutes");
router.use('/user',userRouter);

const fileShareRoutes=require("./fileShareRoutes")
router.use("/share",fileShareRoutes)

// const sharedRoutes=require("./shareRoutes.js");
// router.use('/share',sharedRoutes);

module.exports=router;