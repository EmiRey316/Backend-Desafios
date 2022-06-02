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

    fail(req, res) {
        res.render("./session/fail", {
            title: "Login error",
            type: "LOGIN",
            originalRoute: "/login"
        })
    }
}


module.exports = new Login()