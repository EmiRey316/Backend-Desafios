const { app } = require("faker/lib/locales/en");

class Logout {
    get(req, res) {
        
        res.render("logout", {user: req.session.user});
    }
}


module.exports = new Logout()