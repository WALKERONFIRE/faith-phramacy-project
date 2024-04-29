const User = require("../Models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
};

const getById = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
};

const deleteUser = async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted")
    }catch(err){
    res.status(500).json(err)
    }
    };

const getStats = async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1},
                },
            }
    ]);
    res.status(200).json(data)
    
        }
catch(err){
        res.status(500).json(err)
    }
};

const editUser = async(req,res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password,salt);
    }
    try{
        const selectuser = await User.findById(req.params.id);
        if (selectuser.isAdmin == false) {
            delete req.body.isAdmin;
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updateUser);
    }catch(err){
        res.status(500).json(err);
    }
};
module.exports = {
    getAllUsers,
    getById,
    deleteUser,
    getStats,
    editUser
}