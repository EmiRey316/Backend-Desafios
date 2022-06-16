const express = require("express");

const processInfoController = require("./processInfoController.js");
const { validateSession } = require("../Middlewares");


let processInfoRouter = express.Router();
processInfoRouter.get("/", validateSession, processInfoController.get)


module.exports = processInfoRouter;