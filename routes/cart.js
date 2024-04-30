const router = require ("express").Router();
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");
const cartController = require ("../Controllers/CartController");

//create
router.post("/",verifyToken,cartController.createCart);

//UPDATE   
router.put("/:id",verifyTokenAndAuthorization,cartController.updateCart);

//DELETE
router.delete("/:id",verifyTokenAndAuthorization,cartController.deleteCart);

//get user cart
router.get("/find/:userId",verifyTokenAndAuthorization,cartController.findUserCart);

//get all carts
router.get("/",verifyTokenAndAdmin,cartController.getAllCarts);
module.exports = router;