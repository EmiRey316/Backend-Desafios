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
const productsForm = document.getElementById("productsForm");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn")



productsForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let data = new FormData(productsForm);
	let obj = {author: userEmail};
	data.forEach((value, key) => obj[key] = value);
    socket.emit("product", obj);
})



//Función al servidor que envía el mensaje escrito.
const saveMessage = () => {
    if(chatInput.value.trim().length > 0) {
        socket.emit("message", {
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


socket.on("productsLog", data => {
    const productsTableBody = document.getElementById("productsTableBody");
    let productList = "";
    data.forEach(product => {
        productList = productList + `<tr>
                <td>${product.productName}</td>
                <td>$ ${product.productPrice}</td>
                <td>${product.productThumb}</i>
                </tr>`
    })
    productsTableBody.innerHTML = productList;
})



socket.on("newProduct", data => {
    const productsTableBody = document.getElementById("productsTableBody");
})



//Evento de Websocket que eschucha el envío del cha desde el servidor.
socket.on("chatLog", data => {
    const chatLog = document.getElementById("chatLog");
    let messages = "";
    data.forEach(message => {
        messages = messages + `
                <strong>${message.user}</strong>
                <span>[${message.date}]:</span>
                <i>${message.message}</i>
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

    userSpan.append(data.user);
    dateSpan.append(` [${data.date}]: `);
    messageSpan.append(data.message);

    chatLog.append(userSpan);
    chatLog.append(dateSpan);
    chatLog.append(messageSpan);
    chatLog.append(lineBreak);
})