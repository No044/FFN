const system = require("../../setting/system")
const dashboard = require("./dashboard")
const products = require("./products")
const category = require("./products-category")
const role = require("./role")
const premisson = require("./premisson")
const user = require("./user")
const myaccout = require("./myaccout")
const routerpravite = require("../../middlewares/auth/routerpravite")
module.exports = (app) =>{
    const admin = system.prefixAdmin
    app.use(`/${admin}/dashboard`,routerpravite,dashboard)
    app.use(`/${admin}/products`,routerpravite,products)
    app.use(`/${admin}/category`,routerpravite,category)
    app.use(`/${admin}/role`,routerpravite,role)
    app.use(`/${admin}/premisson`,routerpravite,premisson)
    app.use(`/${admin}/user`,routerpravite,user)
    app.use(`/${admin}/myaccount`,routerpravite,myaccout)
}