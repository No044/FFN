
const homerouter = require("./homerouter")
const productsrouter = require("./productsrouter")
const cart = require("./cart")
const shopproducts = require("./shopproducts")
const chat = require("./chat")
module.exports = (app) => {
    app.use("/",homerouter);
     
    app.use("/products",productsrouter)

    app.use("/shopproducts",shopproducts)

    app.use("/cart",cart)

    app.use("/chat",chat)

}