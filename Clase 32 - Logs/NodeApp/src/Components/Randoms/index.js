const express = require("express");

const randomsController = require("./randomsController");
const { validateSession } = require("../Middlewares");


let randomsRouter = express.Router();
randomsRouter.get("/", validateSession, randomsController.get)


module.exports = randomsRouter;