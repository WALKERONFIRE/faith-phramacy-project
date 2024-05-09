const orderController = require("../Controllers/OrderController");
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");
const router = require("express").Router();

//Create order
router.post("/create",verifyToken,orderController.createOrder);

//edit order
router.put("/update/:id" ,verifyTokenAndAdmin,orderController.editOrder);

//delete order
router.delete("/delete/:id", verifyTokenAndAdmin,orderController.deleteOrder);

//get orders
router.get("/find/:userId",verifyTokenAndAuthorization,orderController.getByUserId);

//get all orders
    
router.get("/" ,verifyTokenAndAdmin,orderController.getallOrders);

//get monthly income from orders
router.get("/income",verifyTokenAndAdmin,orderController.getIncome);

//get by id
router.get("/find/:id",verifyToken,orderController.getById);
      
module.exports = router