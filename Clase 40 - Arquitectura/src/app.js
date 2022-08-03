const handlebars = require("express-handlebars");

const { app, server } = require("./server.js");
const Routes = require("./Routes");


Routes(app)


////////////////////////////////////////////
//               Handlebars               //
////////////////////////////////////////////
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/Views");
app.set("view engine", "handlebars");

