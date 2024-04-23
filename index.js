const express  =  require("express");
const app = express();
const mognoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
const userRoute= require("./routes/user");
const categoryRoute = require("./routes/category");
dotenv.config();


const port = 3000;
mognoose
    .connect("mongodb://localhost:27017/ecommerce0")
    .then(()=> console.log("DB connected successfully!"))
    .catch((err)=>
    {
        console.log(err);
    })

 app.use(express.json());
 app.use("/api/auth", authRoute);
 app.use("/api/user", userRoute);
 app.use("/api/category", categoryRoute);


app.listen(process.env.port || 500 , ()=>{
    console.log("Backend server is running!"); 
});
app.use("/api/auth" , authRoute);

