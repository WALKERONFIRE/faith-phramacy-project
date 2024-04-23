const router = require ("express").Router();

router.get("/usertest", (req,res)=>{
    res.send("test is successfull!");
});


module.exports = router


//get all users 
// get user by ID