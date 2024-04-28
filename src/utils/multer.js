const multer = require("multer");
const crypto=require("crypto");
const path = require("path");      

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueString =
            Date.now() + "_" + crypto.randomBytes(5).toString("hex");
        cb(null, uniqueString);
    },
});




const fileStorage = multer.diskStorage({
    destination:  (req, file, cb) =>{
        cb(null, 'uploads/files/')
    },
    filename: (req, file, cb)=> {
        const uniqueString = Date.now() + '-' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueString)
    }
});


const sharedStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/shares/')
    },
    filename:(req,file,cb)=>{
        const uniqueString=Date.now()+'-'+path.extname(file.originalname);
        cb(null,file.fieldname+'-'+uniqueString)
    }
})


const upload = multer({storage: storage})

const fileUpload = multer({storage: fileStorage})

const shareStorage=multer({storage:sharedStorage})

module.exports = {
    fileUpload,
    shareStorage,
    upload
}