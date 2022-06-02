const express = require("express");

const registrationController = require("./registrationController");
const { isLogged } = require("../Middlewares");


let registrationRouter = express.Router();
registrationRouter.get("/", isLogged, registrationController.get);
registrationRouter.post("/", isLogged, registrationController.save);


module.exports = registrationRouter;