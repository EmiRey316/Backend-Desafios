const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const util = require("util");

const { app, server } = require("./server.js");
const chatRecord = require("./Container/DAOs/chat/chatDao.js");
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
    const { normalize } = require("normalizr");
    const chatSchema = require("./Utils/messageNormalizer.js");

    let chatLog = await chatRecord.read();
    
    //console.log(util.inspect(chatLog, false, 12, true));
    let lgNormal = JSON.stringify(chatLog).length;

    let normalizedChat = normalize(chatLog, chatSchema);
    console.log(util.inspect(normalizedChat, false, 12, true));
    let lgNormalized = JSON.stringify(normalizedChat).length;

    let compressionPercent = (lgNormalized * 100) / lgNormal;


    socket.emit("chatLog", normalizedChat, compressionPercent);


    socket.on('message', async(data) => {
        const moment = require("moment");

        let newMessage = {...data, date: moment().format("DD/MM/YYYY HH:mm:ss")};
        await chatRecord.save(newMessage);
        io.emit("newMessage", newMessage);
    })
})