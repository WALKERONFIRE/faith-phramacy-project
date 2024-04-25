const Order = require("../Models/Order");

const router = require("express").Router();

router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);
    try{
        const saveOrder = await newOrder.save();
        res.status(200).jason(saveOrder);
    } catch (err){
        res.status(500).json(err);
    }

});

router.put("/:id" , async(req,res)=>{
    try{
const updateOrder = await Order.findByIDAndUpdate(
    req.params.id,
    {
        $set: req.body,
    },
    {new: TRUE}
);
    res.status(200).json(updateOrder);
    } catch (err){
        res.status(500).json(err);
        }
  
});

router.delete("/:id", async(req,res)=> {

    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    }
    catch (err){
        res.status(500).json(err);
    }

    });

    router.get("/find/:userId", async(req,res) =>{
        try{
            const orders = await Order.find({userId: req.params.userId});
            res.status(200).json(orders);
        } catch (err){
            res.status(500).json(err);
        }
    });

    router.get("/" , async(req,res) => {
        try{
            const orders = await Order.find();
            res.status(200).json(orders);
        }   catch (err){
            res.status(500).json(err);
        }
    });

    router.get("/income", async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        try {
          const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
              $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: "$sales" },
              },
            },
          ]);
          res.status(200).json(income);
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
module.exports = router