const express = require("express");

const randomsApiController = require("./randomsApiContoller");


let randomsApiRouter = express.Router();
randomsApiRouter.get("/", randomsApiController.get)


module.exports = randomsApiRouter;