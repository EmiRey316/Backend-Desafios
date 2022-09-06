const fetch = require("node-fetch");

const config = require("../../Config");
const { logger } = require("../../Utils/logger.js");


class Randoms {
    async get(req, res) {
    const user = await req.user;

        const host = req.headers.host;
        fetch(`http://${host}/api/randoms`, {
            headers: {quantity: req.query.cant || 1000000000}
        }) 
            .then(response => response.json())
            .then(data => res.render("randoms", {title: "Randoms", randoms: data, user}))
            .catch(error => logger.error("Error al obtener randoms", {error}))
    }
}


module.exports = new Randoms;