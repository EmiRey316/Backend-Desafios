const validateSession = (req, res, next) => {
    if(!req.isAuthenticated()) return res.redirect("/login");
    next();
}

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()) return res.redirect("/");
    next();
}

module.exports = {
    validateSession,
    isLogged
};