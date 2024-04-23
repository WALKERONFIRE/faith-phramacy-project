const  router  = require("express").Router();
const Test = require("../Models/Test.js");
const test = require("../Models/Test.js");
//create
router.post("/" , async(req , res)=>{
    const test = new Test(req.body);
try{
    const addtest = await test.save();
    res.status(200).json(addtest);
}
catch(err)
{
    res.status(500).json(err);  
}
});
router.get("/" , async(req , res)=>{
    const query = req.query.new;
try{
    const test = await test.find();
    res.status(200).json(test);
}
catch(err)
{
    res.status(500).json(err);  
}
});
module.exports  = router;