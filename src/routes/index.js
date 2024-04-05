const router= require('express').Router();


const authRoutes=require('./authRoutes');
router.use('/auth',authRoutes);

const folderRoutes=require('./folderRoutes');
router.use('/folder',folderRoutes);

const fileRoutes=require('./fileRoutes');
router.use('/file',fileRoutes);

const userRouter=require("./userRoutes");
router.use('/user',userRouter);

module.exports=router;