const socket = io();
const authorForm = document.getElementById("authorForm");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn")



//Función que emite al servidor el mensaje escrito, en caso de que se escriba algo.
const saveMessage = (authorInfo) => {
    if(chatInput.value.trim().length > 0) {
        socket.emit("message", {
            author: authorInfo,
            text: chatInput.value,
        });
        chatInput.value = "";
    }
}


//Escucha de evento al enviar mensaje, con los datos del formulario.
authorForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let data = new FormData(authorForm);
    let obj = {};
	data.forEach((value, key) => obj[key] = value);
    saveMessage(obj);
})


// Evento de Websocket que eschucha el envío del chat desde el servidor.
socket.on("chatLog", (data, compressionPercent) => { 
    const chatLog = document.getElementById("chatLog");
    const compessionSpan = document.getElementById("compessionSpan");
    let messages = "";

    //Schemas para normalizr
    const authorSchema = new normalizr.schema.Entity("author", {}, {idAttribute: "email"});
    const chatSchema = new normalizr.schema.Entity("chat", { chat: [{author: authorSchema}] });
    let denormalizedChat = normalizr.denormalize(data.result, chatSchema, data.entities)
    
console.log(denormalizedChat)
    if(!denormalizedChat) {
        console.log("entra");
        return compessionSpan.innerHTML = 0;
    }
    
    

    denormalizedChat.chat.forEach(message => {
        messages = messages + `
                <strong>${message.author.email}</strong>
                <span>[${message.date}]:</span>
                <i>${message.text} </i>
                <img width="5%" src=${message.author.avatar}>
                </br>`
    })
    chatLog.innerHTML = messages;

    compessionSpan.innerHTML = compressionPercent.toFixed(2);
})


//Se recibe el nuevo Mensaje desde el servidor.
socket.on("newMessage", data => {
    const chatLog = document.getElementById("chatLog");
    let userSpan = document.createElement("strong");
    let dateSpan = document.createElement("span");
    let messageSpan = document.createElement("i");
    let lineBreak = document.createElement("br");
    let avatar = document.createElement("img");

    userSpan.append(data.author.email);
    dateSpan.append(` [${data.date}]: `);
    messageSpan.append(`${data.text} `);
    avatar.setAttribute("src", data.author.avatar);
    avatar.setAttribute("width", "5%");

    chatLog.append(userSpan);
    chatLog.append(dateSpan);
    chatLog.append(messageSpan);
    chatLog.append(avatar);
    chatLog.append(lineBreak);
})