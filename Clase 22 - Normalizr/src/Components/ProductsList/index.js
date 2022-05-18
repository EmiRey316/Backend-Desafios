const express = require("express");

const productsListController = require("./productsListController");


let productsListRouter = express.Router();
productsListRouter.get("/", productsListController.get)


module.exports = productsListRouter;