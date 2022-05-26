const express = require("express");

const loginController = require("./loginController");


let loginRouter = express.Router();
loginRouter.get("/", loginController.get)

loginRouter.post("/", loginController.loginUser)


module.exports = loginRouter;