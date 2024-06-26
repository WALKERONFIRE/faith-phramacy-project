const userController = require("../Controllers/UserController");
const { verifyToken,verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("../Controllers/verifyToken");
const router = require ("express").Router();

module.exports = router;


//get all users 
router.get("/",verifyTokenAndAdmin,userController.getAllUsers);

// get user by ID
router.get("/find/:id",verifyTokenAndAuthorization,userController.getById);

//DeleteUser 
router.delete("/delete/:id",verifyTokenAndAuthorization,userController.deleteUser);

//GetUserStats
router.get("/stats",verifyTokenAndAdmin,userController.getStats);

//UpdateUser
router.put("/update/:id",verifyTokenAndAuthorization,userController.editUser);

//UpdateUserPermission 
router.put("/updaterole/:id",verifyTokenAndAdmin,userController.editUserPermission);