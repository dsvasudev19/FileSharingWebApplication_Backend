const {User}=require("../models");
const jwt=require("jsonwebtoken")
const checkAuth=async (req,res,next)=>{
    try {
        const token=req.cookies._devtoken;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }
        const {id} = jwt.verify(token,"devdrive_secret");
        if(!id){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"
            })
        }
        const user=await User.findOne({
            where:{
                id:id
            }
        })
        if(!user){
            return res.status(401).json({
                success:false,message:"Unauthorized Access"
            })
        }

        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
    
}

module.exports=checkAuth