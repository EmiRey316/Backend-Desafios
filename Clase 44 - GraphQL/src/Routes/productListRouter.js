const express = require("express");

const productsListController = require("../Controller/ProductsList/productsListController");
const { validateSession } = require("../Controller/Middlewares");


let productsListRouter = express.Router();
productsListRouter.get("/", validateSession, productsListController.get)


module.exports = productsListRouter;