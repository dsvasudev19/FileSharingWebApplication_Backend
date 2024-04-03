require("dotenv").config();
const express=require("express");
const {sequelize}=require("./src/models");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const app=express();
const PORT=process.env.PORT || 3000;
const routes=require("./src/routes");

const corsOptions={
    origin:[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
    ],
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"))


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


sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${ PORT }`);
    });
});