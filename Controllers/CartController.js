const cart = require("../Models/Cart");

const createCart = async (req,res)=>
{
    const newcart= new cart(req.body);

    try{
        const savedcart= await newcart.save();
        res.status(200).json(savedcart);}
        catch(err){
            res.status(500).json(err);
        }
}
const updateCart = async(req,res)=>
{
    try{
        const updatedcart = await cart.findByIdAndUpdate(
            req.params.id,
            {$set:req.body,},
            {new: true}
            
        );
        res.status(200).json(updatedcart);

    }
    catch (err){
        res.status(500).json(err);
    }
};

const deleteCart = async(req,res)=>
{
    try{
        await cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
        }
                    catch (err){
                        res.status(500).json(err);

    }
};
const findUserCart = async(req,res)=>{
    try{
        const cart = await cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);}
        catch(err){
            res.status(500).json(err);

    }
}

const getAllCarts = async(req,res)=>{


    try {
    const carts =  await cart.find();
    res.status(200).json(carts);
        
    } catch (err) {
        res.status(500).json(err);
        
    }
        
    }
module.exports ={
    createCart,
    updateCart,
    deleteCart,
    findUserCart,
    getAllCarts
}