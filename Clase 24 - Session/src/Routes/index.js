const productsApiRouter = require("../Components/ProductsApi/index.js");
const productsListRouter = require("../Components/ProductsList");
const homeRouter = require("../Components/Home");
const loginRouter = require("../Components/Login");
const logoutRouter = require("../Components/Logout");


module.exports = app => {
    app.use("/api/productos-test", productsApiRouter);
    app.use("/productsList", productsListRouter);
    app.use("/", homeRouter);
    app.use("/login", loginRouter);
    app.use("/logout", logoutRouter);
}