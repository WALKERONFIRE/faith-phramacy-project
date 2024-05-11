const Category = require("../Models/Category");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const cloudinary = require("../Config/cloudinary");

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads/category'); // Specify the directory to save uploads
    // },
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

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
      const category = await Category.findById(categoryId);
      if (!category) {
          return res.status(404).json({ message: "Category not found" });
      }

      if (category.image) {
        const publicId = category.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
            if (error) {
                console.error("Error deleting image from Cloudinary:", error);
                return res.status(500).json({ message: "Error deleting image from Cloudinary" });
            }
        });
    }

      await Category.findByIdAndDelete(categoryId);

      res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Internal Server Error" });
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
const result = await cloudinary.uploader.upload(req.file.path, {
    allowed_formats: ['jpg', 'png']
});
  
        //image: req.file ? req.file.path : null});
    try{
      const newCategory = new Category({
        categoryname: req.body.categoryname,
        colour : req.body.colour,
        image: result.secure_url});
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
            
                if (req.file) {
                  updatedCategory = {
                    categoryname,
                    image: req.file.path,
                  };
                } else {
                  updatedCategory = { categoryname };
                }
            
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