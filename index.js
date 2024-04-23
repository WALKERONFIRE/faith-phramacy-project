const express  =  require("express");
const app = express();
const mognoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
const userRoute= require("./routes/user");
dotenv.config();


const port = 3000;
mognoose
    .connect("mongodb://localhost:27017/ecommerce0")
    .then(()=> console.log("DB connected successfully!"))
    .catch((err)=>
    {
        console.log(err);
    })
 app.use("/api/user", userRoute);

app.use(express.json());
app.listen(process.env.port || 500 , ()=>{
    console.log("Backend server is running!"); 
});
app.use("/api/auth" , authRoute);

