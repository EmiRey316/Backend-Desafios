const express = require("express");

const homeController = require("../Controller/Home/homeController");
const { validateSession } = require("../Controller/Middlewares")


let homeRouter = express.Router();
homeRouter.get("/", validateSession, homeController.get)


module.exports = homeRouter;