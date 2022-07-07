const handlebars = require("express-handlebars");
const { Server } = require("socket.io");


const { app, server } = require("./server.js");
const chatMongo = require("./Container/DAOs/chat/index.js");
const Routes = require("./Routes");


Routes(app);


////////////////////////////////////////////
//               Handlebars               //
////////////////////////////////////////////
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/Views");
app.set("view engine", "handlebars");



////////////////////////////////////////////
//               Websocket                //
////////////////////////////////////////////
const io = new Server(server);

io.on('connection', async(socket)=>{
    let chatXMongo = await chatMongo.read();
    socket.emit("chatLog", chatXMongo);


    socket.on('message', async(data) => {
        const moment = require("moment");

        let newMessage = {...data, date: moment().format("DD/MM/YYYY HH:mm:ss")};
        //Primero emito y luego guardo para que el chat sea más rápido.
        io.emit("newMessage", newMessage);
        await chatMongo.save(newMessage);
    })
})