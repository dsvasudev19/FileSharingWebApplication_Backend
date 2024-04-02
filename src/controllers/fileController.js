const crypto = require('crypto');
const {Op} = require('sequelize');
const {File} = require('./../models');
const bcrypt = require('bcrypt');

const getFilesByFolderRef = async (req, res, next) => {
    try {
        const files = await File.findAll({
            where: {
                folderRef: req.params.folderRef
            }
        })
        if (files) {
            return res.status(200).json({
                success: true,
                data: files,
                message: "Files found"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "No files found",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)

    }
}

const getById = async (req, res, next) => {
    try {
        const file = await File.findOne({
            where: {
                id: req.params.id
            }
        })
        if (file) {
            return res.status(200).json({
                success: true,
                data: file,
                message: "File found"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "File not found",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)

    }
}

const getByRef = async (req, res, next) => {
    try {
        const file = await File.findOne({
            where: {
                ref: req.params.ref
            }
        })
        if (file) {
            return res.status(200).json({
                success: true,
                data: file,
                message: "File found"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "File not found",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)

    }
}


const create = async (req, res, next) => {
    console.log(req.body)
    let foldRef = req.body.folderRef || 1
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
            
            const file = await File.create({
                ...req.body, 
                password: hashedPassword, 
                ref: crypto.randomBytes(6).toString('hex').toUpperCase(), 
                userId: req.body.userId, 
                folderRef: foldRef
            });
            if (file) {
                return res.status(201).json({
                    success: true,
                    data: file,
                    message: "File created successfully"
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "File not created",
                    data: []
                })
            }
        }
        const file = await File.create({
            ...req.body,
            ref: crypto.randomBytes(6).toString('hex').toUpperCase(),
            userId: req.body.userId,
            folderRef: foldRef
        });
        if (file) {
            return res.status(201).json({
                success: true,
                data: file,
                message: "File created successfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "File not created",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)

    }
}

const getFilesByUserId = async (req, res, next) => {
    try {
        const files = await File.findAll({
            where: {
                userId: req.params.userId
            }
        })
        if (files) {
            return res.status(200).json({
                success: true,
                data: files,
                message: "Files found"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "No files found",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateByRef = async (req, res, next) => {
    try {
        const file = await File.findOne({
            where: {
                ref: req.params.ref
            }
        })
        if (file) {
            if (req.body.password) {
                const hash = bcrypt.hashSync(req.body.password, 10);
                file.name = req.body.name;
                file.password = hash;
                await file.save();
                return res.status(200).json({
                    success: true,
                    data: file,
                    message: "File updated successfully"
                })
            } else {
                file.name = req.body.name;
                await file.save();
                return res.status(200).json({
                    success: true,
                    data: file,
                    message: "File updated successfully"
                })
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "File not found",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)

    }
}

const deleteByRef = async (req, res, next) => {
    try {
        const file = await File.findOne({
            where: {
                ref: req.params.ref
            }
        })
        if (file) {
            await file.destroy();
            return res.status(200).json({
                success: true,
                data: file,
                message: "File deleted successfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "File not found",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)

    }
}

module.exports = {
    create,
    updateByRef,
    getByRef,
    deleteByRef,
    getById,
    getFilesByFolderRef,
    getFilesByUserId
}