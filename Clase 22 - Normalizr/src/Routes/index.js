const productsApiRouter = require("../Components/ProductsApi/index.js");
const productsListRouter = require("../Components/ProductsList");
const homeRouter = require("../Components/Home");


module.exports = app => {
    app.use("/api/productos-test", productsApiRouter);
    app.use("/productsList", productsListRouter);
    app.use("/", homeRouter);
}