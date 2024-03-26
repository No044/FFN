const products = require("../../models/products")
const cart = require("../../models/cart")
const account = require("../../models/accountuser")
const bill = require("../../models/bill")
const detailbill = require("../../models/detailbill")

module.exports.cartfeatured = async (req,res) => {
    console.log(req.params)
    const {shop,id} = req.params
    const infocart = {
       idsanpham : id,
       userid : req.cookies.tokenuser,
       quality : 1,
       shopid : shop
    }
    console.log(infocart)
    const check = await cart.findOne({
        idsanpham : id,
        userid : req.cookies.tokenuser,
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
            userid : req.cookies.tokenuser,
            shopid : shop
        },check)
        res.redirect("back")
    }
}
module.exports.cartdetail = async(req,res) => {
    console.log(req.params)
    const {shop,id,quality} = req.params
    const infocart = {
        idsanpham : id,
        userid : req.cookies.tokenuser,
        quality : quality,
        shopid : shop
     }
     const check = await cart.findOne({
        idsanpham : id,
        userid : req.cookies.tokenuser,
        shopid : shop
    })
    console.log(check)
    if(!check){
        const data = await cart(infocart)
        data.save()
        res.redirect("back")
        req.flash("nice","Thêm Vào Giỏ Hàng Thành Công")
    }
    else{
        console.log("Đã chạy vào đây")
        check.quality += parseInt(quality)
        await cart.updateOne({
            idsanpham : id,
            userid : req.cookies.tokenuser,
            shopid : shop
        },check)
        req.flash("nice","Thêm Vào Giỏ Hàng Thành Công")
        res.redirect("back")
    }
}

module.exports.cartuser = async (req,res)=> {
   let total = 0;
   const data = await cart.find({
    userid : req.cookies.tokenuser
   })
   for(const item of data){
    const dataproduct = await products.findOne({
        _id : item.idsanpham
    })
    item.discountPercentage = dataproduct.discountPercentage
    // item.price = dataproduct.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    item.priceNew = ((dataproduct.price / 100) * (100-dataproduct.discountPercentage)).toFixed(0);
    total += parseInt(item.priceNew) * parseInt(item.quality)
    console.log(item.priceNew)
    item.priceNew = item.priceNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';  
    item.title = dataproduct.title
    item.thumbnail = dataproduct.thumbnail
   }
//    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ'
   res.render("client/page/cart/index",{
    data : data,
    total : total
   })
}

module.exports.uquality = async (req,res)=> {
    const {id,quality} = req.params
      await cart.updateOne({
       idsanpham : id,
       userid : req.cookies.tokenuser
    }, { $set: { quality: quality } })
    res.redirect("back")
}

module.exports.deletecart = async(req,res) => {
    console.log(req.params)
    const id = req.params.id
    console.log(id)

    await cart.deleteOne({
        _id : id
    })
    req.flash("nice","đã xóa thành công")
    res.redirect("back")
}

module.exports.pay = async(req,res) => {
    let total = 0
    const data = await account.findOne({
         tokenuser : req.cookies.tokenuser
    })
    const datacart = await cart.find({
        userid : req.cookies.tokenuser
    })
    for(const item of datacart){
        console.log(item.idsanpham)
        const dataproduct = await products.findOne({
            _id : item.idsanpham
        })
        console.log(dataproduct)
        item.priceNew = ((dataproduct.price / 100) * (100-dataproduct.discountPercentage)).toFixed(0);
        total += parseInt(item.priceNew) * parseInt(item.quality)
    }
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ'
    console.log(total)
    res.render("client/page/cart/oder",{
        data : data,
        total : total
    })
}

module.exports.paypost = async(req,res) => {
    let {fullName,city,address,Phone,email,total,payment} = req.body
     total = total.replace(/\./g, "");

     total = parseInt(total);
     const inforuser = {
        iduser : req.cookies.tokenuser,
        fullName : fullName,
        total : total,
   
        email : email,
        Phone : Phone,
        city : city,
        paymentMethod : payment,
        address : address
    }
    const data = new bill(inforuser)
    await data.save()
    console.log(data)
    console.log(data.id)
    const datacart = await cart.find({
          userid : req.cookies.tokenuser
    })
    for(const item of datacart){
        const infordetailbill = {
            idhoadon : data.id,
            idsanpham : item.idsanpham,
            quality : item.quality
        }
        const newdetail = new detailbill(infordetailbill)
        await newdetail.save()
    }
    await cart.deleteMany({ userid: req.cookies.tokenuser });
    req.flash("nice,Thanh Toán Thành Công")
    res.redirect("back")
}


