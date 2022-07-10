const { fork } = require("child_process");


class RandomsApi {
    get(req, res) {
        const quantity = req.headers.quantity || 1000000;

        let randomFork = fork("./src/Components/API/RandomsApi/randomCalculator.js")
        randomFork.send(quantity);

        randomFork.on("message", randoms => {
            res.json(randoms);
        })

    }
}


module.exports = new RandomsApi;