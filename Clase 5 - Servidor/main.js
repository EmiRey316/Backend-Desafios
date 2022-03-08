const http = require("http");

const randomBetween = (min, max) => {
    return Math.floor(Math.random()*max + min);
}

const server = http.createServer((req, res) => {
    let item = {
        id: randomBetween(1, 10),
        title: `Producto ${randomBetween(1, 10)}`,
        price: randomBetween(0.00, 9999.99),
        thumbnail: `Foto ${randomBetween(1, 10)}`
    }

    res.end(JSON.stringify(item));
});

server.listen(3000, () => {
    console.log(`Servidor arrancado`);
});
