const Category = require("../Models/Category");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/category/') // Specify the directory to save uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
  });
  const upload = multer({ storage: storage });
  
const getAllCategories = async (req,res)=>{
    try{
        const category = await Category.find();
        res.status(200).json(category);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
};

const deleteCategory = async(req,res)=>{
    try{
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json("Category has been deleted")
    }
    catch(err){
    res.status(500).json(err)
    }
    };

const getById = async (req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
};

const addCategory = async(req,res)=>{
    const newCategory = new Category({
        categoryname: req.body.categoryname,
        colour : req.body.colour,
        image : req.file.path
    });
    try{
        const savedcatgory = await newCategory.save();
        res.status(201).json(savedcatgory);
    }catch(err){
        res.status(500).json(err);
    }
    };
module.exports = {
    getAllCategories,
    deleteCategory,
    getById,
    addCategory,
    upload
}