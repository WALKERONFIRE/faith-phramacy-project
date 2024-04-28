const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");
const router = require('express').Router();
const productController = require("../Controllers/ProductController");

//create a new
router.post('/',verifyTokenAndAdmin,productController.addProduct);

//update product
router.put("/:id",verifyTokenAndAdmin,productController.editProduct);

//delete product
router.delete("/:id",verifyTokenAndAdmin,productController.deleteProduct);

//get product by ID
router.get("/find/:id",verifyTokenAndAdmin,productController.getById);

//get all products
router.get("/",verifyTokenAndAdmin,productController.getAllProducts);


module.exports = router;