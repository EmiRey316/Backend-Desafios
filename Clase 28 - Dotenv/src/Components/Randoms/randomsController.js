const fetch = require("node-fetch");

const config = require("../../Config")


class Randoms {
    async get(req, res) {
        fetch(`http://${config.HOST}:${config.PORT}/api/randoms`, {
            headers: {quantity: req.query.cant || 100000000}
        })
            .then(response => response.json())
            .then(data => res.send(data))
            .catch(err => console.error(err))
    }
}


module.exports = new Randoms;