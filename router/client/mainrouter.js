
const homerouter = require("./homerouter")
const productsrouter = require("./productsrouter")
const cart = require("./cart")
module.exports = (app) => {
    app.use("/",homerouter);
     
    app.use("/products",productsrouter)

    app.use("/cart",cart)

}