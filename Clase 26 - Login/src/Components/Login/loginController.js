class Login {
    get(req, res) {
        res.render("./session/login");
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