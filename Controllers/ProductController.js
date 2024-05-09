const Product = require("../Models/Product");
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/product'); // Specify the directory to save uploads
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

const addProduct = async (req, res) => {
   
    try{
        const newProduct = new Product(req.body);
        newProduct.image = req.file.path;
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct); 
    }catch(err){
        return res.status(500).json(err);
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
        const product = await Product.findById(req.params.id);

        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        await Product.findByIdAndDelete(req.params.id);
        if (product.image) {
            const imagePath = path.join(__dirname, product.image);
            fs.unlinkSync(imagePath); // Delete the file
          }
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
const getByCategoryId = async(req,res) =>{
    try{
        const products = await Order.find({categoryId: req.params.categoryId});
        res.status(200).json(products);
    } catch (err){
        res.status(500).json(err);
    }
};
module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getById,
    getAllProducts,
    getByCategoryId,
    upload

}