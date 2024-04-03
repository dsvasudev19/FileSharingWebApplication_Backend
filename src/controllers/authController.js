const jwt = require('jsonwebtoken');
const {User} = require('../models');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({id: user.id, email: user.email}, "devdrive_secret");
        res.cookie("_devtoken", token, {
            // httpOnly: true,
            // sameSite: "none",
            // secure: false,
            maxAge: 3600000
        })
        return res.status(200).json({success: true, data: token, message: "Logged in successfully"})
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const register = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            password: hashedPassword, ...req.body
        })
        return res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully"
        })
    }
    catch (error) {
        console.log(error);
        next(error)
    }
}

const getUserByToken =async (req,res,next) =>{
    try {
        const token = req.cookies._devtoken;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const {id} = jwt.verify(token, "devdrive_secret");
        if(!id){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const user =await User.findOne({
            where: {
                id: id
            },
            attributes:{
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        req.user = user;
        return res.status(200).json({
            success:true,
            data: user,
            message: "User retrieved successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const logout = async(req,res,next)=>{
    try{
        res.cookie("_devtoken", null, {
            maxAge: 0,
            // httpOnly:true,
            // secure:false,sameSite:"none"
        });
        return res.status(200).json({success:true,message:"Succecssfully logged out"})

    }catch(error){
        console.log(error);
        next(error);
    }
}

module.exports = {
    login,
    register,
    getUserByToken,
    logout
}