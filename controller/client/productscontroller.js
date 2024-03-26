const products = require("../../models/products")

module.exports.index = async (req,res) => {
    const dataproduct = await products.find({
        status: "active",
        deleted: false
      });    
      for (const item of dataproduct) {
        item.priceNew = ((item.price / 100) * (100-item.discountPercentage)).toFixed(0);
        item.priceNew = item.priceNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';  
      }    
      console.log(dataproduct)
      
    res.render("client/page/products/index",{
        products : dataproduct
    });
}
module.exports.detail = async (req,res) => {
  const {slug} = req.params
  const data = await products.findOne({
    slug : slug
  })
    data.priceNew = ((data.price / 100) * (100-data.discountPercentage)).toFixed(0);
    data.priceNew = data.priceNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';  
    
  console.log(data)
  res.render("client/page/products/detail",{
    data : data
})
}