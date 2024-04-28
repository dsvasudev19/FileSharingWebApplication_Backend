const router = require('express').Router();
const {sharedUpload} = require("./../utils/multer")
const userAuthMiddleware = require("./../middlewares/userAuthMiddleware")
const {Share, File, User, sequelize} = require('./../models')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
router.post("/", [userAuthMiddleware], sharedUpload.single('file'), async (req, res, next) => {

    const t = await sequelize.transaction();
    try {

        const file = await File.create({
            ...req.body,
            ref: crypto.randomBytes(6).toString('hex').toUpperCase(),
            userId: req.body.userId,
            folderRef: "shared",
            file_name: req.file.filename,
            original_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_size: req.file.size,
            url: `./uploads/sharedFiles/${ req.file.filename }`,
            path: ""
        }, {transaction: t});

        let receiver = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        
        if(!receiver){
            receiver=await User.create({email:req.body.email,password:bcrypt.hashSync("devdrive@2024",10)},{transaction:t})
        }

        const sharedFile = await Share.create({
            fileRef: file.ref,
            senderId: req.user.id,
            receiverId: receiver.id,
            password: bcrypt.hashSync(req.body.password, 10)
        }, {transaction: t})
        await t.commit();
        res.status(200).json({success: true, message: "Successfully uploaded"})
    } catch (error) {
        await t.rollback();
        console.log(error);
        next(error);
    }

    
})

module.exports = router;