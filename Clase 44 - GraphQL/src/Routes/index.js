const { warnLogger } = require("../Utils/logger.js")

const productsApiRouter = require("../Controller/API/ProductsApi");
const randomsApiRouter = require("../Controller/API/RandomsApi")

const productsListRouter = require("./productListRouter.js");
const homeRouter = require("./homeRouter.js");
const processInfoRouter = require("./processInfoRouter.js");
const randomsRouter = require("./randomsRouter.js");

const loginRouter = require("./Session/loginRouter.js");
const logoutRouter = require("./Session/logoutRouter.js");
const registrationRouter = require("./Session/registrationRouter.js");



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

    //404
    app.get("*", (req, res) => {
        warnLogger.warn(`Ruta ${req.url} no encontrada`)
        res.status(404).send("Página no encontrada")
    });
}