const md5 = require("md5")
const Account = require("../../models/account")
module.exports.index = (req,res) => {
    res.render("admin/page/myaccount/index")
}
module.exports.edit = async (req, res) => {
    res.render("admin/page/myaccount/edit", {
      pageTitle: "Chỉnh sửa thông tin cá nhân",
    });
  };
  
  // [PATCH] /admin/my-account/edit
  module.exports.editpost = async (req, res) => {
    const id = res.locals.user.id;
    console.log(req.body)
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
   try {
    await Account.updateOne({
      _id: id
    }, req.body);
    req.flash("nice","Cập Nhật Thành Công")
    res.redirect("back")
   } catch (error) {
    req.flash("error","Cập Nhật Thất Bại")
    res.redirect("back");
   }
};