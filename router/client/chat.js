const express = require("express")
const router = express.Router();
const controller = require("../../controller/client/chat")
router.get("/",controller.index)

module.exports = router;