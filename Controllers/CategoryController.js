const Category = require("../Models/Category");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/category'); // Specify the directory to save uploads
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Use unique filename
    },
  });
  const fileFilter = (req, file, cb) => {
    // Accept only JPG and PNG files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed'), false);
    }
  };
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter

 });
  
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
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }
    await Category.findByIdAndDelete(req.params.id)
    if (category.image) {
        const imagePath = path.join(__dirname, category.image);
        fs.unlinkSync(imagePath); // Delete the file
      }
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
        image: req.file ? req.file.path : null});
    try{
        const savedcatgory = await newCategory.save();
        res.status(201).json(savedcatgory);
    }catch(err){
        res.status(500).json(err);
    }
    };

    const updateCategory = async(req,res)=>
        {
            try {
                const categoryId = req.params.id;
                const { categoryname } = req.body;
                let updatedCategory = {};
            
                // If image is uploaded, update image path
                if (req.file) {
                  updatedCategory = {
                    categoryname,
                    image: req.file.path,
                  };
                } else {
                  updatedCategory = { categoryname };
                }
            
                // Find the category by ID and update its details
                const result = await Category.findByIdAndUpdate(categoryId, updatedCategory, { new: true });
            
                if (!result) {
                  return res.status(404).json({ message: 'Category not found' });
                }
            
                res.status(200).json(result);
              } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
              }
        };
        
module.exports = {
    getAllCategories,
    deleteCategory,
    getById,
    addCategory,
    updateCategory,
    upload
}