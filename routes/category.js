const Category = require("../Models/Category");
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("./verifyToken");
const router = require ("express").Router();

//get all categories
router.get("/",verifyToken,async (req,res)=>{
    try{
        const category = await Category.find();
        res.status(200).json(category);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//delete category
router.delete("/delete/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json("Category has been deleted")
    }catch(err){
    res.status(500).json(err)
    }
    });

//get Category by ID
router.get("/find/:id",verifyToken,async (req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

//create category
router.post("/create",verifyTokenAndAdmin,async(req,res)=>{
const newCategory = new Category({
    categoryname: req.body.categoryname
});
try{
    const savedcatgory = await newCategory.save();
    res.status(201).json(savedcatgory);
}catch(err){
    res.status(500).json(err);
}
});


module.exports = router;
