const fetch = require("node-fetch");

const config = require("../../Config");
const { logger } = require("../../Utils/logger.js");


class ProductsList {
    async get(req, res) {
        const user = await req.user;
        fetch(`http://${config.HOST}:${config.PORT}/api/productos-test`)
            .then(response => response.json())
            .then(data => res.render("products", {title: "Products List", alias: user.alias, avatar: user.avatar, data}))
            .catch(error => logger.error("Error al obtener lista de productos", {error}))
    }
}


module.exports = new ProductsList;