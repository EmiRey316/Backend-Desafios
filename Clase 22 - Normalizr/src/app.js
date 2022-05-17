const express = require("express");
const handlebars = require("express-handlebars");
const moment = require("moment");
const { Server } = require("socket.io");

const Archive = require("./fileManager.js");



////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////
const app = express();
const PORT = process.env.POR || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



////////////////////////////////////////////
//               Handlebars               //
////////////////////////////////////////////
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/Views");
app.set("view engine", "handlebars");



// let productsList = new Archive("./src/Files/productsList.txt");
// let chatRecord = new Archive("./src/Files/chatRecord.txt");




////////////////////////////////////////////
//               Websocket                //
////////////////////////////////////////////
const io = new Server(server);

io.on('connection', async(socket)=>{
    let productsLog = await productsList.read();
    socket.emit("productsLog", productsLog);

    let chatLog = await chatRecord.read();
    socket.emit("chatLog", chatLog);

    socket.on("product", async(data) => {
        await productsList.save(data);
        io.emit("newProduct", data);
    })

    socket.on('message', async(data) => {
        let newMessage = {...data, date: moment().format("DD/MM/YYYY HH:mm:ss")};
        await chatRecord.save(newMessage);
        io.emit("newMessage", newMessage);
    })
})



////////////////////////////////////////////
//                Routes                  //
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("home", {title: "Centro de mensajes"})
})


app.get("/api/productos-test", (req, res) => {
    const faker = require("faker");
    faker.locale = "es";

    let productList = [];
    for(let i = 1; i <= 5; i++) {
        productList.push({
            name: faker.commerce.product(),
            price: faker.commerce.price(100, 1000),
            photo: faker.image.animals(640, 480, true)
        })
    }

    res.render("products", {title: "Productos test", productList});
})