process.on("message", quantity => {
    let randoms = {};

    for(let i = 1; i <= quantity; i++) {
        let num = Math.floor(Math.random() * 1000 + 1);
        if(randoms.hasOwnProperty(num)) {
            randoms[num]++;
        } else {
            randoms[num] = 1;
        }
    }

    process.send(randoms);
    process.exit
})

