const chatInput = document.getElementById("chatInput");
let userEmail;

swal({
    title: "Ingrese su email",
    content: {
        element: "input",
        attributes: {
            placeholder: "ejemplo@mail.com"
        }
    },
    closeOnClickOutside: false,
})
.then(res => {
    userEmail = res
})


const socket = io();
const sendBtn = document.getElementById("sendBtn")
const productsForm = document.getElementById("productsForm");


//Función al servidor que envía el mensaje escrito.
const saveMessage = () => {
    if(chatInput.value.trim().length > 0) {
        socket.emit('message', {
            user: userEmail,
            message: chatInput.value,
        });
        chatInput.value = "";
    }
}

//Evento que eschucha la escritura en el input del chat.
chatInput.addEventListener("keyup", evt => {
    if(evt.key === "Enter"){
        saveMessage();
    }
})

sendBtn.addEventListener("click", () => {
    saveMessage();
})


//Evento de Websocket que eschucha el envío del cha desde el servidor.
socket.on("chatLog", data => {
    const chatLog = document.getElementById("chatLog");
    let messages = "";
    data.forEach(message => {
        messages = messages + `
            <span style="color:blue"><strong>${message.user}</strong></span>
            <span style="color:brown">[${message.date}]:</span>
            <span style="color:green"><i>${message.message}</i></span>
            </br>`
    })
    chatLog.innerHTML = messages;
})