require("dotenv").config();
const express=require("express");
const {sequelize}=require("./src/models");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const PORT=process.env.PORT || 3000;
const routes=require("./src/routes");
const {fileUpload}=require("./src/utils/multer")
const app=express();
const bcrypt=require("bcrypt");
const crypto=require("crypto");
const {File}=require("./src/models")
const corsOptions={
    origin:[
        "http://localhost:5173",
        "https://devdrive.vercel.app",
        "https://dev-drive.vercel.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], allowedHeaders: "Content-Type,Authorization,Set-Cookie", credentials: true,
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"))
app.use(express.static("uploads"))

app.use("/api",routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err.message);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        error: {code: statusCode, message: "Something went wrong!", err},
    });
});


app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.post("/test",(req,res)=>{
    console.log(req.body)
});

app.post("/test-file", fileUpload.single("file"), async (req, res, next) => {
    let foldRef = req.body.folderRef || "root"

    const hashedPassword=bcrypt.hashSync(req.body.password,10);
    console.log(req.file);
    const file = await File.create({
        ...req.body,
        password: hashedPassword,
        ref: crypto.randomBytes(6).toString('hex').toUpperCase(),
        userId: req.body.userId,
        folderRef: foldRef,
        file_name: req.file.filename,
        original_name: req.file.originalname,
        file_type: req.file.type,
        file_size: req.file.size,
        url: `./uploads/files/${ req.file.filename }`
    });
    return res.status(200).json({success:true,message:"Successfully uploaded the files",file})
})


sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${ PORT }`);
    });
});
