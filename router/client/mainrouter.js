// module.exports = (app) => {
//     app.("/", (req,res)=> {
//         res.render("client/page/home/index");
//      });
     
//      app.get("/products", (req,res)=> {
//          res.render("client/page/products/index");
//      })
// }

const homerouter = require("./homerouter")
const productsrouter = require("./productsrouter")
module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("client/page/home/index");
    });
     
   app.use("/products",productsrouter)

}