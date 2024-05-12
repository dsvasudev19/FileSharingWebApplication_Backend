const {Share, File, User} = require("../models")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {sequelize} = require("../models");
const getAllFilesSharedWithYou = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const sharedFiles = await Share.findAll({
            where: {
                receiverId: userId
            },
            include: [
                {
                    model: File,
                    as: 'file'
                }
            ]
        })
        if (sharedFiles) {
            return res.status(200).json({success: true, message: "Successfully Fetched all the shared files with you", data: sharedFiles})
        }
        else {
            return res.status(200).json({success: true, message: "Coudn't find any shared files with you", data: []})
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const shareFileWithFriend = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        let receiver;
        const buffer = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (buffer) {
            receiver = buffer
        } else {
            receiver = await User.create({
                email: req.body.email,
                password: bcrypt.hashSync("devdrive@123", 10)
            })
        }
        const file = await File.create({
            ...req.body,
            ref: crypto.randomBytes(6).toString('hex').toUpperCase(),
            userId: 0,
            folderRef: "shared",
            file_name: req.file.filename,
            original_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_size: req.file.size,
            url: `./uploads/shares/${ req.file.filename }`,
            path: ""
        }, transaction);

        const share = await Share.create({
            fileRef: file.ref,
            senderId: req.user.id,
            receiverId: receiver.id,
            password: bcrypt.hashSync(req.body.password, 10)
        }, {transaction: transaction})

        await transaction.commit();

        res.status(200).json({success: true, message: "Successfully Shared file with your friend"})

    } catch (error) {
        await transaction.rollback();
        console.log(error);
        next(error);
    }
}


const shareUploadedFileWithFriend = async (req, res, next) => {
    console.log(req.body)
    const t = await sequelize.transaction();
    try {
        const receiver = await User.findOne({
            where: {
                email: req.body.email
            }
        }, {transaction: t})

        if (!receiver) {
            return res.status(400).json({success: false, message: "Receiver is Not an existing user."})
        } else {
            const share = await Share.create({
                fileRef: req.body.fileRef,
                senderId: req.user.id,
                receiverId:receiver.id
            }, {transaction: t})


            await t.commit();
            return res.status(200).json({success: true, message: "File shared successfully"})
        }
    } catch (error) {
        await t.rollback();
        console.log(error);
        next(error);
    }
}

const downloadFile=async(req,res,next)=>{
    try {
        const file=await File.findByPk(req.params.id);
        console.log(file)
        if(file){
            // backend\uploads\files\file - 1714305783173 -.jpg
            return res.download(`/FileSharingApp/backend/uploads/files/${file.file_name}`,`${file.file_name}`);
        }else{
            return res.status(404).json({success:false,message:"No Such file found"})
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}




module.exports = {getAllFilesSharedWithYou, shareFileWithFriend, shareUploadedFileWithFriend, downloadFile}