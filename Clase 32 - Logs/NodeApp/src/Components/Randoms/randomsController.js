const fetch = require("node-fetch");

const config = require("../../Config");
const { logger } = require("../../Utils/logger.js");


class Randoms {
    async get(req, res) {
        fetch(`http://${config.HOST}:${config.PORT}/api/randoms`, {
            headers: {quantity: req.query.cant || 100000000}
        })
            .then(response => response.json())
            .then(data => res.render("randoms", {title: "Randoms", randoms: data}))
            .catch(error => logger.error("Error al obtener randoms", {error}))
    }
}


module.exports = new Randoms;