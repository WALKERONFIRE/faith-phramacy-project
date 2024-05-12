const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");
const router = require('express').Router();
const productController = require("../Controllers/ProductController");

//create a new
router.post('/create',verifyTokenAndAdmin,productController.upload.single("image"),productController.addProduct);

//update product
router.put("/update/:id",verifyTokenAndAdmin,productController.upload.single('image'),productController.editProduct);

//delete product
router.delete("/delete/:id",verifyTokenAndAdmin,productController.deleteProduct);

//get product by ID
router.get("/find/:id",verifyToken,productController.getById);

//get all products
router.get("/",verifyToken,productController.getAllProducts);
//get products by CategoryID
router.get("/find/:categoryid",verifyToken,productController.getByCategoryId);


module.exports = router;