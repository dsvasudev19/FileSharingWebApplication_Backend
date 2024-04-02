const {Folder,File}= require('./../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const createFolder = async (req, res, next) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
            const folder = await Folder.create({
                ...req.body,
                userId: req.body.userId,
                password: hashedPassword,
                ref: crypto.randomBytes(6).toString('hex').toUpperCase()
            })
            return res.status(201).json({
                success: true,
                data: folder,
                message: "Folder created successfully"
            })
        }else{
            const folder = await Folder.create({
                ...req.body,
                userId: req.body.userId,
                ref: crypto.randomBytes(6).toString('hex').toUpperCase()
            })
            return res.status(201).json({
                success: true,
                data: folder,
                message: "Folder created successfully"
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const getFoldersByUserId = async (req, res, next) => {
    try {
        const folders = await Folder.findAll({
            where: {
                userId: req.body.userId
            }
        })
        if(folders){
            return res.status(200).json({
                success: true,
                data: folders,
                message:"Successfully Fetched Folders"
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "No folders found",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getFolderByRef = async (req, res, next) => {
    try {
        const folder = await Folder.findOne({
            where: {
                ref: req.params.ref
            },
            include:[
                {
                    model:File,
                    as:'files'
                }
            ]
        })
        if(folder){
            return res.status(200).json({
                success: true,
                data: folder,
                message: "Successfully fetched folder"
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "Folder not found"
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const deleteFolderByRef = async (req, res, next) => {
    try {
        const folder = await Folder.findOne({
            where: {
                ref: req.params.ref
            }
        })
        if(folder){
            await folder.destroy();
            return res.status(200).json({
                success: true,
                message: "Folder deleted successfully"
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "Folder not found"
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const updateFolderByRef=async(req,res,next)=>{
    try{
        const folder=await Folder.findOne({
            where:{
                ref:req.params.ref
            }
        })
        if(folder){
            if (req.body.password) {
                const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

                folder.password=hashedPassword;
                folder.name=req.body.name;
                await folder.save();

                return res.status(201).json({
                    success: true,
                    data: folder,
                    message: "Folder created successfully"
                })
            }
            else{
                folder.name=req.body.name;
                await folder.save();
            }
            return res.status(200).json({
                success:true,
                data:folder,
                message:"Folder updated successfully"
            })
        }else{
            return res.status(404).json({
                success:false,
                message:"Folder not found"
            })
        }
    }catch(error){
        console.log(error);
        next(error);
    }
}


module.exports = {
    createFolder,
    getFoldersByUserId,
    getFolderByRef,
    deleteFolderByRef,
    updateFolderByRef
}