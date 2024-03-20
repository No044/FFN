const express = require("express")
const router = express.Router()

const auth = require("../../controller/auth/login")
router.get("/",auth.index)

router.post("/loginpost",auth.indexpost)

router.get("/logout",auth.logout)
// router.get("/create",role.create)

// router.post("/createpost",role.createpost)

module.exports = router