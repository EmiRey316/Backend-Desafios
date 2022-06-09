const productsApiRouter = require("../Components/ProductsApi");
const randomsApiRouter = require("../Components/API/RandomsApi")

const productsListRouter = require("../Components/ProductsList");
const homeRouter = require("../Components/Home");
const processInfoRouter = require("../Components/ProcessInfo");
const randomsRouter = require("../Components/Randoms");

const loginRouter = require("../Components/Session/Login");
const logoutRouter = require("../Components/Session/Logout");
const registrationRouter = require("../Components/Session/Registration");



module.exports = app => {
    app.use("/api/productos-test", productsApiRouter);
    app.use("/api/randoms", randomsApiRouter);

    app.use("/productsList", productsListRouter);
    app.use("/", homeRouter);
    app.use("/info", processInfoRouter);
    app.use("/randoms", randomsRouter);

    //Session
    app.use("/login", loginRouter);
    app.use("/logout", logoutRouter);
    app.use("/signUp", registrationRouter);
}