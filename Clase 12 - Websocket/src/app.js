import express from "express";
import moment from "moment";
import { Server } from "socket.io";
import __dirname from "./utils.js";

const app = express();
const PORT = process.env.POR || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

const io = new Server(server);

app.use(express.static(__dirname+"/public"))



let chatLog = [];
io.on('connection', socket=>{
    socket.emit("chatLog", chatLog);

    socket.on('message', data => {
        chatLog.push({...data, date: moment().format("DD/MM/YYYY HH:mm:ss")})
        io.emit("chatLog", chatLog)
    })
})
