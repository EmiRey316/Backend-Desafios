const express = require("express");
const handlebars = require("express-handlebars");
const moment = require("moment");
const { Server } = require("socket.io");


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
//              Persistencia              //
////////////////////////////////////////////
//let productsList = new Archive("./src/Files/productsList.txt");
let chatRecord = require("./Container/DAOS/chatSQL.js");



////////////////////////////////////////////
//          Motores de plantilla          //
////////////////////////////////////////////
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");



////////////////////////////////////////////
//                  Chat                  //
////////////////////////////////////////////
const io = new Server(server);

io.on('connection', async(socket)=>{
    let chatLog = await chatRecord.read();
    socket.emit("chatLog", chatLog);

    socket.on('message', async(data) => {
        let newMessage = {...data, date: moment().format("DD/MM/YYYY HH:mm:ss")};
        await chatRecord.save(newMessage);
        io.emit("newMessage", newMessage);
    })
})




////////////////////////////////////////////
//                 Routes                 //
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("home", {title: "Formulario de producto"});
})

app.get("/productos", async (req, res) => {
    let products = await productsList.read()
    res.render("products", {title: "Listado de productos", productsList: products});
})

app.post("/productos", async (req, res) => {
    await productsList.save(req.body);
    res.redirect("/")
})