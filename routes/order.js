const orderController = require("../Controllers/OrderController");
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");
const router = require("express").Router();

//Create order
router.post("/",verifyToken,orderController.createOrder);

//edit order
router.put("/:id" ,verifyTokenAndAdmin,orderController.editOrder);

//delete order
router.delete("/:id", verifyTokenAndAdmin,orderController.deleteOrder);

//get orders
router.get("/find/:userId",verifyTokenAndAuthorization,orderController.getByUserId);

//get all orders
    
router.get("/" ,verifyTokenAndAdmin,orderController.getallOrders);

//get monthly income from orders
router.get("/income",verifyTokenAndAdmin,orderController.getIncome);
      
module.exports = router