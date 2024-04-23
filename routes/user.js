const router = require ("express").Router();

router.get("/usersignuptest", (req,res)=>{
    res.send("test is successfull!");
});


module.exports = router