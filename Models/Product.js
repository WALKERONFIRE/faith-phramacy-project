const mongoose = require('mongoose');
const category = require('./Category');


const ProductSchema = new mongoose.Schema(
    {
        title : {type: String, required: true, unique: true},
        desc : {type: String, required: true,},
        image : {type: String, required: true},
        size : {type: String,},
        price : {type: Number, required: true},
        categoryId : {type: mongoose.Schema.Types.ObjectId, required: true, ref:category}
    },
    {timestamps : true}
);

module.exports = mongoose.model("Product", ProductSchema);