import express from "express";
import handlebars from "express-handlebars";

import __dirname from "./utils.js";
import Archive from "./fileManager.js";
import { templateEngine } from "./config.js";


////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////
const app = express();
const PORT = process.env.POR || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



////////////////////////////////////////////
//              Persistencia              //
////////////////////////////////////////////
let productsList = new Archive("./src/Files/productsList.txt");



////////////////////////////////////////////
//          Motores de plantilla          //
////////////////////////////////////////////
switch (templateEngine) {
    case "Pug":
        app.set("views", __dirname+"/views/pug");
        app.set("view engine", "pug");
        break;

    case "Ejs":
        app.set("views", __dirname+"/views/ejs/pages");
        app.set("view engine", "ejs");
        break;

    default:
        app.engine("handlebars", handlebars.engine());
        app.set("views", __dirname+"/views/handlebars");
        app.set("view engine", "handlebars");
        break;
}



////////////////////////////////////////////
//                 Routes                 //
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("home", {title: "Formulario de producto"});
})

app.get("/productos", async (req, res) => {
    let products = await productsList.read()
    res.render("products", {title: "Listado de productos", productsList: products});
})

app.post("/productos", async (req, res) => {
    await productsList.save(req.body);
    res.redirect("/")
})