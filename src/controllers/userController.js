const {User} = require("./../models");
const crypto = require("crypto");
const bcrypt = require("bcrypt")

const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (users) {
            return res.status(200).json({success: true, message: 'Successfully fetched all users', data: users})
        }
        else {
            return res.status(200).json({success: false, message: 'No users found', data: []})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            return res.status(200).json({success: true, message: 'Successfully fetched user', data: user})
        }
        else {
            return res.status(200).json({success: false, message: 'User not found'})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const user = await User.create({
            ...req.body,
            password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : ""
        })
        if (user) {
            return res.status(201).json({success: true, message: 'Successfully created user', data: user})
        }
        else {
            return res.status(200).json({success: false, message: 'User not created'})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
 
const update = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            const updatedUser = await User.update({...req.body, password: user.password},{
                where: {
                    id: user.id
                }
            });
            if (updatedUser) {
                return res.status(200).json({success: true, message: 'Successfully updated user', data: user})
            }
            else {
                return res.status(200).json({success: false, message: 'User not updated'})
            }
        }
        else {
            return res.status(404).json({success: false, message: 'User not found'})
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteUser = async (req, res, next) => {

    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            return res.status(200).json({success: true, message: 'Successfully deleted user', data: user})
        } else {
            return res.status(404).json({success: false, message: "User not found"})
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    deleteUser, 
    update, 
    create, 
    getById, 
    getAll
}

// TODO:nothing to do