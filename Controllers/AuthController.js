const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Register = async(req , res)=>{
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
}

const Login = async (req, res) => {
    try
    {
    const userValid = await User.findOne(
    {
    username : req.body.username
    });
    //const jwtSecret = '2C7wIEzcb2INl3L440TJeWXgMRkLHU/Msv4W72lqrMU=';
    
   if(!userValid) 
   {
    return res.status(401).json("Wrong Credintials");
    }
    const passValid  = await bcrypt.compare(req.body.password , userValid.password)
    if(!passValid)
    {
       return  res.status(401).json("Wrong Credintials");
    }
    console.log("twsr");
    const {password , ...others} = userValid._doc;
    const accessToken = jwt.sign(
        {
            id : userValid._id,
            isAdmin : userValid.isAdmin,
        },
        process.env.JWT_SEC ,
        //jwtSecret,
        {expiresIn:"3d"}
    );
    
   return res.status(200).json({...others , accessToken});
    
    }
    catch(err)
    {
        res.status(500).json(err);
    }
    }

    module.exports = {
        Login,
        Register
    }
