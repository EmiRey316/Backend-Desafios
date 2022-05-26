const express = require("express");

const productsListController = require("./productsListController");
const validateSession = require("../Middlewares");


let productsListRouter = express.Router();
productsListRouter.get("/", validateSession, productsListController.get)


module.exports = productsListRouter;