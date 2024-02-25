const system = require("../../setting/system")
const dashboard = require("./dashboard")
const products = require("./products")
module.exports = (app) =>{
    const admin = system.prefixAdmin
    console.log(admin)
    app.use(`/${admin}/dashboard`,dashboard)
    app.use(`/${admin}/products`,products)
}