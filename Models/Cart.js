const mongoose= require("mongoose");
const CartSchema = new mongoose.Schema({
    userid: { type:string , required:true , unigue:true},
    products: [
        {
            productid:{
                type: string,

            },
            quantity :{
                type:Number,
                default:1,
            },
        }
    ]
   
    

},{timestamps:true});
module.exports= mongoose.model("user",userSchema);