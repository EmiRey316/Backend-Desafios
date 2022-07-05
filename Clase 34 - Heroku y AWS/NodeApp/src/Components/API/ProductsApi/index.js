const express = require("express");

const productsApiController = require("./productsApiController");


let productsApiRouter = express.Router();
productsApiRouter.get("/", productsApiController.get)


module.exports = productsApiRouter;