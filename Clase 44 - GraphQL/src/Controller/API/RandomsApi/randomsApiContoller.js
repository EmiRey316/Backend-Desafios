const { fork } = require("child_process");


class RandomsApi {
    get(req, res) {
        const quantity = req.headers.quantity || 100000000;

        let randomFork = fork("./src/Components/API/RandomsApi/randomsApiCalculator.js")
        randomFork.send(quantity);

        randomFork.on("message", randoms => {
            res.json(randoms);
        })

    }
}


module.exports = new RandomsApi;