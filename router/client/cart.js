const express = require("express")
const router = express.Router();
const controllor = require("../../controller/client/cart")

router.post("/:shop/:id", controllor.index)

module.exports = router;