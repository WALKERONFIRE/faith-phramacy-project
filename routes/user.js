const User = require("../Models/User");
const bcrypt = require("bcrypt");
const router = require ("express").Router();

module.exports = router;


//get all users 

router.get("/", async (req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});



// get user by ID

router.get("/find/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});



//DeleteUser 
router.delete("/delete/:id",async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted")
    }catch(err){
    res.status(500).json(err)
    }
    });




//GetUserStatus
router.get("/status",async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1},
                },
            }
    ]);
    res.status(200).json(data)
    
}catch(err){
        res.status(500).json(err)
    }
});



//UpdateUser
router.put("/update/:id",async(req,res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updateUser);
    }catch(err){
        res.status(500).json(err);
    }
});