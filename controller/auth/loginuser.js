const accountuser = require("../../models/accountuser")
const md5 = require("md5")
const system = require("../../setting/system")
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
module.exports.login = async (req,res) => {
    res.render(`auth/page/loginuser/index.pug`)
  }
  
module.exports.loginpost = async (req,res) => {
  const email = req.body.email
  const password = req.body.password
  const user = await accountuser.findOne({
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
  res.cookie("tokenuser",user.tokenuser);
  res.redirect(`/`)
  }
 
  module.exports.register = async (req,res) => {

    res.render(`auth/page/loginuser/register.pug`)
  }
  
module.exports.registerpost = async (req,res) => {
    const {fname,sdt,email,password} = req.body
    const check = await accountuser.findOne({
      email : email,
      deleted : false
    })
    console.log(check)
    if(check){
      req.flash("erro","Email đã tồn tại")
      res.redirect("back");
      return;
    }
    const infouser = {
      fullname : fname,
      email : email,
      phone : sdt,
      password : md5(password),
      tokenuser : generateRandomString(30)
    }
    console.log(infouser)
    const user = new accountuser(infouser)
    await user.save()
    req.flash("nice","Đăng Ký Thành Công")
    res.redirect(`/auth/loginuser`)
  }
  
  
  
  
  