const  router  = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");


// register endpoint 

router.post("/register" ,async(req , res)=>{
    const salt = await bcrypt.genSalt();
const newUser = new User(
{
username : req.body.username,
firstname : req.body.firstname,
lastname : req.body.lastname,
email : req.body.email,
password: req.body.password
});
newUser.password = await bcrypt.hash(newUser.password, salt);
try{
 
    const saveduser = await newUser.save();
    res.status(201).json(saveduser);
}
catch(err)
{
    res.status(500).json(err);
}
});
//Login
router.post('/login', async (req, res) => {
try
{
const userValid = await User.findOne(
{
username : req.body.username
});
!userValid && res.status(401).json("Wrong Credintials");
const passValid  = await bcrypt.compare(req.body.password , userValid.password)
if(!passValid)
{
    res.status(401).json("Wrong Credintials");
}
res.status(200).json(userValid);

}
catch(err)
{
    res.status(500).json(err);

}
});


module.exports  = router;
