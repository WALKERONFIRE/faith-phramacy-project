const router = require ("express").Router();

//create
router.post("/", async (req,res)=>
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
router.put("/id", async(req,res)=>
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
router.delete("/id", async(req,res)=>
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
router.get ("/find/:userId",async(req,res)=>{
    try{
        const cart = await cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);}
        catch(err){
            res.status(500).json(err);

    }
});
//get all carts
router.get("/", async(req,res)=>{


try {
const carts =  await cart.find();
res.status(200).json(carts);
    
} catch (err) {
    res.status(500).json(err);
    
}
    
})
module.exports = router;