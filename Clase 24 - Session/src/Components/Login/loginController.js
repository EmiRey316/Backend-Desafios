class Login {
    get(req, res) {
        res.render("login");
    }

    loginUser(req, res) {
        const { userName } = req.body;
        req.session.user = userName;
        res.redirect("/");
    }
}


module.exports = new Login()