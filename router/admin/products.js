const express = require("express")
const router = express.Router()
const products = require("../../controller/admin/products")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, prefix + "-" + file.originalname);
    }
  })
const upload = multer({ storage: storage })

router.get("/",products.index)
router.patch("/change/:action/:id",products.change)
router.patch("/changeall",products.changeall)
router.delete("/delete/:id",products.delete)
router.get("/create",products.create)
router.post("/createpost",upload.single("thumbnail"),products.createpost)
module.exports = router;