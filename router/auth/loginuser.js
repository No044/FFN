const express = require("express")
const router = express.Router()

const auth = require("../../controller/auth/loginuser")
router.get("/",auth.login)

router.post("/loginpost",auth.loginpost)

router.get("/register",auth.register)

router.post("/registerpost",auth.registerpost)


module.exports = router
