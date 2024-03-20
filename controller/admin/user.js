const role = require("../../models/roles")
const account = require("../../models/account")
const md5 = require("md5")
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
module.exports.index = async (req, res) => {

  const data = await account.find({
  })
  for (const item of data) {
    const datarole = await role.findOne({
      _id: item.role_id
    })
    item.namerole = datarole.title

  }
  console.log(data)
  res.render("admin/page/user/index", {
    data: data
  })
}

module.exports.create = async (req, res) => {
  const data = await role.find({
  })
  res.render("admin/page/user/create", {
    roles: data
  })
}

module.exports.createpost = async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  req.body.password = md5(req.body.password)
  req.body.token = generateRandomString(30)
  console.log(req.body)
  const data = new account(req.body)
  await data.save()
  req.flash("nice", "Tạo Tài Khoản Thành Công")
  res.redirect("back")
}

module.exports.edit = async (req, res) => {
  const id = req.params.id
  try {
    const data = await account.findOne({
      _id: id
    })
    const roles = await role.find({

    })
    res.render("admin/page/user/edit", {
      roles: roles,
      data: data
    })
  } catch (error) {
    res.redirect("back")
  }
}

module.exports.editpost = async (req, res) => {
  console.log(req.body)
  console.log(req.body.id)
  try {
    req.flash("nice", "Cập Nhật Thành Công")
    await account.updateOne({
      _id: req.body.id
    }, req.body)
    res.redirect("back")
  } catch (error) {
    req.flash("error", "Xin lỗi bạn đã cập nhật thất bại")
    res.redirect("back")
  }

}