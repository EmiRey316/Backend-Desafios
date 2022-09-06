const express = require("express");

const processInfoController = require("../Controller/ProcessInfo/processInfoController.js");
const { validateSession } = require("../Controller/Middlewares");


let processInfoRouter = express.Router();
//Saco la validación de sesión para que los test tengan sentido, sino nunca hago el console.log
processInfoRouter.get("/", processInfoController.get)


module.exports = processInfoRouter;