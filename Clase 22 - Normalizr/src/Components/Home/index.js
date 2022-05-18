const express = require("express");

const homeController = require("./homeController");


let homeRouter = express.Router();
homeRouter.get("/", homeController.get)


module.exports = homeRouter;