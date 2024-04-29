const mongoose= require("mongoose");
const user = require("../Models/User");
const product = require("../Models/Product");

const CartSchema = new mongoose.Schema({
    Userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref:user},
    products: [
        {
            productid:{
                type: mongoose.Schema.Types.ObjectId, required: true, ref:product

            },
            quantity :{
                type:Number,
                default:1,
            },
        }
    ]
   
    

},{timestamps:true});
module.exports= mongoose.model("Cart",CartSchema);