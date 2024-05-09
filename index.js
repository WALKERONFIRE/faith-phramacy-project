const express  =  require("express");
const app = express();
const mognoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute= require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();


const port = 3000;
mognoose
    .connect("mongodb+srv://ahmedhhh3512:pass1234@cluster0.nxaxv1r.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("DB connected successfully!"))
    .catch((err)=>
    {
        console.log(err);
    })

 app.use(express.json());
 app.use("/api/auth", authRoute);
 app.use("/api/user", userRoute);
 app.use("/api/category", categoryRoute);
 app.use("/api/product", productRoute);
 app.use("/api/order", orderRoute);
 app.use("/api/cart", cartRoute);




 app.listen(port ,'192.168.1.3', ()=>{
    console.log("Backend server is running!"); 
});

