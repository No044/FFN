
const homerouter = require("./homerouter")
const productsrouter = require("./productsrouter")
const cart = require("./cart")
const shopproducts = require("./shopproducts")
const chat = require("./chat")
const pravite = require("../../middlewares/client/praviteclient")
module.exports = (app) => {
    app.use("/",homerouter);
     
    app.use("/products",productsrouter)

    app.use("/shopproducts",shopproducts)

    app.use("/cart",cart)

    app.use("/chat",pravite,chat)

}