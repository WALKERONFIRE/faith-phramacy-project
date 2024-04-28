const Product = require("../Models/Product");

const addProduct = async (req, res) => {
    const newProduct = new Product(req.body)
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
    getAllProducts

}