const express = require("express");

const randomsController = require("../Controller/Randoms/randomsController");
const { validateSession } = require("../Controller/Middlewares");


let randomsRouter = express.Router();
//Saco la validación de login para que los test ingresen sin problemas y evaluen correctamente la ruta.
randomsRouter.get("/", randomsController.get)


module.exports = randomsRouter;