//const { fork } = require("child_process");


class RandomsApi {
    get(req, res) {
        const quantity = req.headers.quantity || 100000000;

        // let randomFork = fork("./src/Components/API/randomsApi/randomCalculator.js")
        // randomFork.send(quantity);

        // randomFork.on("message", randoms => {
        //     res.send(randoms);
        // })


        //Como dice la letra, saco el child process, volviendo bloqueante a la ruta.
        let randoms = {};

        for(let i = 1; i <= quantity; i++) {
            let num = Math.floor(Math.random() * 1000 + 1);
            if(randoms.hasOwnProperty(num)) {
                randoms[num]++;
            } else {
                randoms[num] = 1;
            }
        }
        
        res.send(randoms)
    }
}


module.exports = new RandomsApi;