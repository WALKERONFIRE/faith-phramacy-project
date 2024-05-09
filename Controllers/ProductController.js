const Product = require("../Models/Product");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/product/') // Specify the directory to save uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
  });
  const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.image = req.file.path;
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct); 
    }catch(err){
        res.status(500).json(err);
    }
};

const editProduct = async (req, res)=>{
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body
            },
            {
                new : true
            }
        );
        res.status(200).json(updatedProduct);
    }catch (err) {
        res.status(500).json(err);
    }
};

const deleteProduct = async (req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted successfully");
    }catch (err) {
        res.status(500).json(err);
    }
};

const getById = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch (err) {
        res.status(500).json(err);
    }
};

const getAllProducts = async (req, res)=>{
    try {
        let products;
        products = await Product.find(req.body.categoryId);
        res.status(200).json(products);
    }catch (err) {
        res.status(500).json(err);
    }
};
module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getById,
    getAllProducts,
    upload

}