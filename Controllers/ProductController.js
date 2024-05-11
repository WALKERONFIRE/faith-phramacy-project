const Product = require("../Models/Product");
const multer = require("multer");
const path = require('path');
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

const addProduct = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
        allowed_formats: ['jpg', 'png']
    });
    try{
        const newProduct = new Product({
            title: req.body.title,
            desc: req.body.desc,
            image : result.secure_url, 
            size: req.body.size, 
            color: req.body.color, 
            price: req.body.price,
            categoryId: req.body.categoryId 
        });

        // const newProduct = new Product(req.body);
        // newProduct.image =  result.secure_url
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
        if (product.image) {
            const publicId = product.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
                if (error) {
                    console.error("Error deleting image from Cloudinary:", error);
                    return res.status(500).json({ message: "Error deleting image from Cloudinary" });
                }
            });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted successfully");
    }catch (err) {
        console.error("Error deleting product:", error);
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