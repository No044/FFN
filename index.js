const express = require("express")
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const router = require("./router/client/mainrouter")
const routeradmin = require("./router/admin/main")
const dotevn = require("dotenv")
const connect = require("./database/database")
const system = require("./setting/system")
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
dotevn.config();
const app = express();
const port = process.env.port;

// app.set("view","./views")
// app.set("view engine", "pug")
app.use(bodyParser.urlencoded({ extended: false}))
app.use(methodOverride('_method'));
app.set("views","./views")
app.set("view engine", "pug")
app.use(cookieParser('KJJSLKASASASA'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.locals.prefixAdmin = system.prefixAdmin
app.use(express.static("public"))
router(app);
routeradmin(app);
connect.connect();
app.listen(port, () => {
    console.log('Đây là app của tôi')
})