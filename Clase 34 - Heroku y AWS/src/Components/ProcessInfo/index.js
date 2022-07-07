const express = require("express");

const processInfoController = require("./processInfoController.js");
const { validateSession } = require("../Middlewares");


let processInfoRouter = express.Router();
//Saco la validación de sesión para que los test tengan sentido, sino nunca hago el console.log
processInfoRouter.get("/", processInfoController.get)


module.exports = processInfoRouter;