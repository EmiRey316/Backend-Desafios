import express from "express";
import moment from "moment";
import { Server } from "socket.io";

import __dirname from "./utils.js";
import Archive from "./fileManager.js";

const app = express();
const PORT = process.env.POR || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
const io = new Server(server);


app.use(express.static(__dirname+"/public"))
app.use(express.json());
let productsList = new Archive("./src/Files/productsList.txt");
let chatRecord = new Archive("./src/Files/chatRecord.txt");



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
