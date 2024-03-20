const products = require("../../models/products")
const cart = require("../../models/cart")

module.exports.index = async (req,res) => {
    console.log(req.params)
    const {shop,id} = req.params
    const infocart = {
       idsanpham : id,
       userid : req.cookies.token,
       quality : 1,
       shopid : shop
    }
    console.log(infocart)
    const check = await cart.findOne({
        idsanpham : id,
        userid : req.cookies.token,
        shopid : shop
    })
    console.log(check)
    if(!check){
        const data = await cart(infocart)
        data.save()
        res.redirect("back")
    }
    else{
        console.log("Đã chạy vào đây")
        check.quality += 1
        await cart.updateOne({
            idsanpham : id,
            userid : req.cookies.token,
            shopid : shop
        },check)
        res.redirect("back")
    }
}
module.exports.detail = (req,res) => {
    res.send("Trang chi tiết sản phẩm");
}