const User = require("../Models/User");

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