const express = require("express")
const router = express.Router();
const controllor = require("../../controller/client/sp")

router.get("/", controllor.index)


module.exports = router;