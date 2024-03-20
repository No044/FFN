const account = require("../../models/account")
const md5 = require("md5")
const system = require("../../setting/system")
module.exports.index = (req,res) => {
    res.render("auth/page/login/index.pug")
}

module.exports.indexpost = async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await account.findOne({
        email : email,
        deleted : false
    })
    if(!user){
        req.flash("error","Email không tồn tại")
        res.redirect("back")
        return
    }
    if(md5(password) != user.password){
        req.flash("error","Mật Khẩu Không đúng")
        res.redirect("back")
        return
    }
    if(user.status != "active"){
        req.flash("error","Tài Khoản của bạn đang bị khóa")
        res.redirect("back")
        return
    }
    req.flash("nice","Đăng Nhập Thành Công")
    res.cookie("token",user.token);
    res.redirect(`/${system.prefixAdmin}/dashboard`)
}

module.exports.logout = async (req,res) => {
  res.clearCookie("token")
  res.redirect(`/auth/loginadmin`)
}

