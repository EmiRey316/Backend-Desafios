const express = require("express");

const registrationController = require("../../Controller/Session/Registration/registrationController");
const { isLogged } = require("../../Controller/Middlewares");
const passport = require("../../Controller/Session/Passport");


let registrationRouter = express.Router();
registrationRouter.get("/", isLogged, registrationController.get);
registrationRouter.post("/", passport.authenticate('signup', {failureRedirect:"/signup/failSignup", successRedirect:"/"}));
registrationRouter.get("/failSignup", isLogged, registrationController.fail)


module.exports = registrationRouter;