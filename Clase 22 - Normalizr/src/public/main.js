const socket = io();
const authorForm = document.getElementById("authorForm");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn")



//Función al servidor que envía el mensaje escrito.
const saveMessage = (authorInfo) => {
    if(chatInput.value.trim().length > 0) {
        socket.emit("message", {
            ...authorInfo,
            message: chatInput.value,
        });
        chatInput.value = "";
    }
}

authorForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let data = new FormData(authorForm);
    let obj = {};
	data.forEach((value, key) => obj[key] = value);
    saveMessage(obj);
})



//Evento de Websocket que eschucha el envío del cha desde el servidor.
socket.on("chatLog", data => { 
    const chatLog = document.getElementById("chatLog");
    let messages = "";
    data.forEach(message => {
        messages = messages + `
                <strong>${message.authorMail}</strong>
                <span>[${message.date}]:</span>
                <i>${message.message} </i>
                <img width="5%" src=${message.authorAvatar}>
                </br>`
    })
    chatLog.innerHTML = messages;
})

socket.on("newMessage", data => {
    const chatLog = document.getElementById("chatLog");
    let userSpan = document.createElement("strong");
    let dateSpan = document.createElement("span");
    let messageSpan = document.createElement("i");
    let lineBreak = document.createElement("br");
    let avatar = document.createElement("img");

    userSpan.append(data.authorMail);
    dateSpan.append(` [${data.date}]: `);
    messageSpan.append(`${data.message} `);
    avatar.setAttribute("src", data.authorAvatar);
    avatar.setAttribute("width", "5%");

    chatLog.append(userSpan);
    chatLog.append(dateSpan);
    chatLog.append(messageSpan);
    chatLog.append(avatar);
    chatLog.append(lineBreak);
})