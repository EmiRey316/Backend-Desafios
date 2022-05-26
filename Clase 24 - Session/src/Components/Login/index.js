const express = require("express");

const loginController = require("./loginController");
const { isLogged } = require("../Middlewares")


let loginRouter = express.Router();
loginRouter.get("/", isLogged, loginController.get)

loginRouter.post("/", loginController.loginUser)


module.exports = loginRouter;