const product = require("../../models/products")
const category = require("../../models/category")
module.exports.index = async(req,res) => {
    const productsFeatured = await product.find({
        featured: "1",
        status: "active",
        deleted: false,
      }).sort({ position: "desc" }).limit(8);
      for (const item of productsFeatured) {
        item.priceNew = ((item.price / 100) * (100-item.discountPercentage)).toFixed(0);
        item.priceNew = item.priceNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';  
      }
    const data = await category.find({
        parent_id : ""
    })
    console.log(data)
      res.render("client/page/home/index", {
        pageTitle: "Trang chủ",
        data : productsFeatured,
        category : data
      });
}