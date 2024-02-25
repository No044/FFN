const products = require("../../models/products")

module.exports.index = async (req,res) => {
    const dataproduct = await products.find({
        status: "active",
        deleted: false
      });    
      for (const item of dataproduct) {
        item.priceNew = item.price * (1 - item.discountPercentage/100);
        item.priceNew = item.priceNew.toFixed(0);
        item.phitest = "hihi";
      }    
      console.log(dataproduct)
      
    res.render("client/page/products/index",{
        products : dataproduct
    });
}
module.exports.detail = (req,res) => {
    res.send("Trang chi tiết sản phẩm");
}