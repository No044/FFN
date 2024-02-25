const express = require("express")
const router = express.Router();
const controllor = require("../../controller/client/productscontroller")

router.get("/", controllor.index)
router.get("/detail", controllor.detail)

module.exports = router;