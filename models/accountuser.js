const mongoose = require("mongoose");

const accountuser = new mongoose.Schema(
    {
        fullName : String,
        email : String,
        password : String,
        tokenuser : String,
        phone : String,
        avatar : {
            type : String,
            default : "https://hocdohoacaptoc.com/storage/2022/02/avata-dep-nam-2.jpg"},
        status : {
           type : String,
           default : "active"
        },
        deleted : {
            type : Boolean,
            default : false,
        },
        deletedAt : Date,

    },{
        timestamps : true
    }
)

const Accountuser = mongoose.model("Accountuser",accountuser,"accountuser")

module.exports = Accountuser