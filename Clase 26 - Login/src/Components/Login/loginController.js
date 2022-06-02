class Login {
    get(req, res) {
        res.render("./session/login");
    }

    loginUser(req, res) {
        const { userName, avatar } = req.body;
        req.session.user = userName;
        req.session.avatar = avatar;
        res.redirect("/");
    }
}


module.exports = new Login()