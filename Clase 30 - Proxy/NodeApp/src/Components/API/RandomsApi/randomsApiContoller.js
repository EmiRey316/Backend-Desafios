const { fork } = require("child_process");


class RandomsApi {
    get(req, res) {
        const quantity = req.headers.quantity || 100000000;

        let randomFork = fork("./src/Components/API/randomsApi/randomCalculator.js")
        randomFork.send(quantity);

        randomFork.on("message", randoms => {
            res.send(randoms);
        })

    }
}


module.exports = new RandomsApi;