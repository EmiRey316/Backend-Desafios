const { logger } = require("../../Utils/logger.js")

const validateSession = (req, res, next) => {
    if(!req.isAuthenticated()) return res.redirect("/login");
    next();
}

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()) return res.redirect("/");
    next();
}


const consoleLogger = (req, res, next) => {
    logger.log("info", `Ruta: ${req.url} - Método: ${req.method}`);
    next();
}

module.exports = {
    validateSession,
    isLogged,
    consoleLogger
};