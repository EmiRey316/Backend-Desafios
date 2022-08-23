const express = require("express");

const logoutController = require("../../Controller/Session/Logout/logoutController");


let logoutRouter = express.Router();
logoutRouter.get("/", logoutController.get);


module.exports = logoutRouter;