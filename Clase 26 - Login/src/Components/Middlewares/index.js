const validateSession = (req, res, next) => {
    if(!req.session.user) return res.redirect("/login");
    next();
}

const isLogged = (req, res, next) => {
    if(req.session.user) {
        return res.redirect("/");
    }
    next();
}

module.exports = {
    validateSession,
    isLogged
};