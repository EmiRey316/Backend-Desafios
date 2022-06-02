const fetch = require("node-fetch");


class ProductsList {
    get(req, res) {
        fetch(process.env.ROOT_URL+"/api/productos-test")
            .then(response => response.json())
            .then(data => res.render("products", {title: "Products List", data}))
            .catch(err => console.error(err))
    }
}


module.exports = new ProductsList;