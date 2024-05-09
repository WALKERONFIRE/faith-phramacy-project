const categoryController = require("../Controllers/CategoryController");
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");

const router = require ("express").Router();

//get all categories
router.get("/",verifyToken,categoryController.getAllCategories);

//delete category
router.delete("/delete/:id",verifyTokenAndAdmin,categoryController.deleteCategory);

//get Category by ID
router.get("/find/:id",verifyToken,categoryController.getById);

//create category
router.post("/create",verifyTokenAndAdmin,categoryController.upload.single("image"),categoryController.addCategory);

//edit category
router.put("/update/:id",verifyTokenAndAdmin,categoryController.upload.single("image"),categoryController.updateCategory);

module.exports = router;
