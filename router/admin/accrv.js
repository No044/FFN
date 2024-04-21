const express = require("express")
const router = express.Router()
const accoutreview = require("../../controller/admin/accrv")

router.get("/",accoutreview.index)
router.get("/check/:id",accoutreview.check)
module.exports = router