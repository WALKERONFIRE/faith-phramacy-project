const router = require ("express").Router();
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("./verifyToken");
//create
router.post("/",verifyToken,async (req,res)=>
{
    const newcart= newcart(req.body);

    try{
        const savedcart= await newcart.save();
        res.status(200).json(savedcart);}
        catch(err){
            res.status(500).json(err);
        }
});

//UPDATE   
router.put("/id",verifyTokenAndAuthorization,async(req,res)=>
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
});

//DELETE
router.delete("/id",verifyTokenAndAuthorization,async(req,res)=>
{
    try{
        await cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
        }
                    catch (err){
                        res.status(500).json(err);

    }
});
//get user cart
router.get ("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const cart = await cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);}
        catch(err){
            res.status(500).json(err);

    }
});
//get all carts
router.get("/",verifyTokenAndAdmin,async(req,res)=>{


try {
const carts =  await cart.find();
res.status(200).json(carts);
    
} catch (err) {
    res.status(500).json(err);
    
}
    
})
module.exports = router;