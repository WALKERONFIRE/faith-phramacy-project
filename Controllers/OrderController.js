const Order = require("../Models/Order");
const Product = require("../Models/Product");

const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        // Calculate total price of the products in the order
        let totalPrice = 0;
        for (const item of req.body.products) {
            const product = await Product.findById(item.productid);
            totalPrice += product.price * item.quantity;
        }
        
        // Set the total amount in the order
        newOrder.amount = totalPrice;

        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};

const editOrder = async(req,res)=>{
    try{
const updateOrder = await Order.findByIDAndUpdate(
    req.params.id,
    {
        $set: req.body,
    },
    {new: true}
);
    res.status(200).json(updateOrder);
    } catch (err){
        res.status(500).json(err);
        }
  
};

const deleteOrder = async(req,res)=> {

    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    }
    catch (err){
        res.status(500).json(err);
    }
    };

    const getByUserId = async(req,res) =>{
        try{
            const orders = await Order.find({userId: req.params.userId});
            res.status(200).json(orders);
        } catch (err){
            res.status(500).json(err);
        }
    };

    const getallOrders = async(req,res) => {
        try{
            const orders = await Order.find();
            res.status(200).json(orders);
        }   catch (err){
            res.status(500).json(err);
        }
    };

    const getIncome =async (req, res) => {
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
      };

      const getById = async (req,res)=>{
        try{
            const user = await Order.findById(req.params.id);
            res.status(200).json(user);
        }
        catch(err)
        {
            res.status(500).json(err);
        }
    };
module.exports = {
    createOrder,
    getById,
    editOrder,
    deleteOrder,
    getByUserId,
    getallOrders,
    getIncome
}