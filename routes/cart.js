const router = require ("express").Router();
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");
const cartController = require ("../Controllers/CartController");

//create
router.post("/create",verifyToken,cartController.createCart);

//UPDATE   
router.put("/update/:id",verifyTokenAndAuthorization,cartController.updateCart);

//DELETE
router.delete("/delete/:id",verifyTokenAndAuthorization,cartController.deleteCart);

//get user cart
router.get("/findbyuser/:userId",verifyTokenAndAuthorization,cartController.findUserCart);

//get all carts
router.get("/",verifyTokenAndAdmin,cartController.getAllCarts);
module.exports = router;