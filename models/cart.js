const mongoose = require("mongoose");

const cart = new mongoose.Schema(
    {
        shopid : String,
        userid : String,
        quality : Number,
        idsanpham : String,
        deleted : {
            type : Boolean,
            default : false,
        },
        deletedAt : Date,

    },{
        timestamps : true
    }
)

const Cart = mongoose.model("Cart",cart,"cart")

module.exports = Cart