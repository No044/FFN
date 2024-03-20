
const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
  title: String,
  slug: {
    type : String,
    slug : "title",
    unique : true
  },
  categoryid:{
    type : String,
    default : ""
  },
  shopid : String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,  
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type : Boolean,
    default : false
  },
  deletedAt : Date,
  featured: String
},{
  timestamps : true
});

const Product = mongoose.model("Products", productSchema, "products");

module.exports = Product;