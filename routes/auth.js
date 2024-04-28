const  router  = require("express").Router();
const authController = require("../Controllers/AuthController");


// register endpoint 

router.post("/register" , authController.Register);

//Login endpoint
router.post('/login',authController.Login);


module.exports  = router;
