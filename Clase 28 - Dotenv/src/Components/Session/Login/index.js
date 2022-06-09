const express = require("express");

const loginController = require("./loginController");
const { isLogged } = require("../../Middlewares");
const { passport } = require("../../../server.js");


let loginRouter = express.Router();
loginRouter.get("/", isLogged, loginController.get)
loginRouter.post("/", passport.authenticate('login', {failureRedirect:"/login/failLogin", successRedirect:"/"}))
loginRouter.get("/failLogin", isLogged, loginController.fail)


module.exports = loginRouter;