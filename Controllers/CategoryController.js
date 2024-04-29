const Category = require("../Models/Category");

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
        categoryname: req.body.categoryname
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
    addCategory
}