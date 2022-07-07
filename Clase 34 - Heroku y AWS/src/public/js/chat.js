const socket = io();
const messageBtn = document.getElementById("messageBtn");
const userName = document.getElementById("userName");
const avatar = document.getElementById("avatar");



//Función que emite al servidor el mensaje escrito, en caso de que se escriba algo.
const saveMessage = (message) => {
    if(chatInput.value.trim().length > 0) {
        socket.emit("message", {
            author: {
                name: userName.textContent,
                avatar: avatar.src
            },
            text: message,
        });
        chatInput.value = "";
    }
}


//Escucha de evento al enviar mensaje, con los datos del formulario.
messageBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const chatInput = document.getElementById("chatInput");
    saveMessage(chatInput.value);
})


// Evento de Websocket que eschucha el envío del chat desde el servidor.
socket.on("chatLog", (data) => { 
    const chatLog = document.getElementById("chatLog");
    //const compressionSpan = document.getElementById("compressionSpan");
    let messages = "";

    // //Schemas para normalizr
    // const authorSchema = new normalizr.schema.Entity("author", {}, {idAttribute: "email"});
    // const chatSchema = new normalizr.schema.Entity("chat", { chat: [{author: authorSchema}] });
    // let denormalizedChat = normalizr.denormalize(data.result, chatSchema, data.entities)
    
    // if(!denormalizedChat) {
    //     return compressionSpan.innerHTML = 0;
    // }
    

    data.forEach(message => {
        messages = messages + `
                <strong>${message.author.name}</strong>
                <span>[${message.date}]:</span>
                <i>${message.text} </i>
                <img width="5%" src=${message.author.avatar}>
                </br>`
    })
    chatLog.innerHTML = messages;
})


//Se recibe el nuevo Mensaje desde el servidor.
socket.on("newMessage", data => {
    const chatLog = document.getElementById("chatLog");
    let userSpan = document.createElement("strong");
    let dateSpan = document.createElement("span");
    let messageSpan = document.createElement("i");
    let lineBreak = document.createElement("br");
    let avatar = document.createElement("img");

    userSpan.append(data.author.name);
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