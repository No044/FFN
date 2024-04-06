const express = require("express")
const router = express.Router();
const controllor = require("../../controller/client/cart")

router.post("/featured/:shop/:id", controllor.cartfeatured)
router.post("/detail/:shop/:id/:quality", controllor.cartdetail)

router.get("/cartuser",controllor.cartuser)
router.get("/cartuser/:id/:quality",controllor.uquality)
router.get("/cartuser/:id",controllor.deletecart)
router.get("/oder/pay",controllor.pay)
router.post("/oder/pay",controllor.paypost)

module.exports = router;