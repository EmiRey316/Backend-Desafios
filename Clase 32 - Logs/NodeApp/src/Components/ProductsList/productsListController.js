const fetch = require("node-fetch");

const config = require("../../Config")


class ProductsList {
    async get(req, res) {
        const user = await req.user;
        fetch(`http://${config.HOST}:${config.PORT}/api/productos-test`)
            .then(response => response.json())
            .then(data => res.render("products", {title: "Products List", alias: user.alias, avatar: user.avatar, data}))
            .catch(err => console.error(err))
    }
}


module.exports = new ProductsList;