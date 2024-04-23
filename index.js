const express  =  require("express");
const app = express();
const mognoose = require("mongoose");
const testRoute = require("./routes/test");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
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
app.listen(port , ()=>{
    console.log("Backend server is running!"); 
});
app.use("/api/auth" , authRoute);

