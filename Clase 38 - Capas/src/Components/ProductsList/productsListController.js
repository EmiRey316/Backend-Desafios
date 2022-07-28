const fetch = require("node-fetch");

const { logger } = require("../../Utils/logger.js");


class ProductsList {
    async get(req, res) {
        const host = req.headers.host;
        const user = await req.user;
        fetch(`http://${host}/api/productos-test`)
            .then(response => response.json())
            .then(data => res.render("products", {title: "Products List", user, data}))
            .catch(error => logger.error("Error al obtener lista de productos", {error}))
    }
}


module.exports = new ProductsList;