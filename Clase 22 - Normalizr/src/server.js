const express = require("express");


////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


module.exports = {app, server};