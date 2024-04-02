const router= require('express').Router();


const authRoutes=require('./authRoutes');
router.use('/auth',authRoutes);

const folderRoutes=require('./folderRoutes');
router.use('/folder',folderRoutes);

const fileRoutes=require('./fileRoutes');
router.use('/file',fileRoutes);

module.exports=router;