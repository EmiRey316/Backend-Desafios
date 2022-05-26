const express = require("express");

const logoutController = require("./logoutController");


const logoutRouter = express.Router();
logoutRouter.get("/", logoutController.get);


module.exports = logoutRouter;