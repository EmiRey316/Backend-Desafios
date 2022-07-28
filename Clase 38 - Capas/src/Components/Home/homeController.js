const { Server } = require("socket.io");

const { server } = require("../../server.js");
const HomeService = require("./homeService.js");


class Home {
    async get(req, res) {
        let user = await req.user;

        const io = new Server(server);

        io.on('connection', async(socket)=>{
            let chatXMongo = await HomeService.read()
            socket.emit("chatLog", chatXMongo);


            socket.on('message', async(data) => {
                const moment = require("moment");

                let newMessage = {...data, date: moment().format("DD/MM/YYYY HH:mm:ss")};
                //Primero emito y luego guardo para que el chat sea más rápido.
                io.emit("newMessage", newMessage);
                await HomeService.saveMessage(newMessage);
            })
        })

        res.render("home", {title: "Centro de mensajes", user})
    }
}


module.exports = new Home;