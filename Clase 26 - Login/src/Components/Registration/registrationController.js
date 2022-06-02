const usersList = require("../../Container/DAOs/users")

class Registration {
    get(req, res) {
        res.render("./session/registration", {title: "Registro"})
    }

    async save(req, res) {
        let user = req.body;
        if(await usersList.findByEmail(user.email)) return res.redirect("signUp/failRegister")
        
        await usersList.save(user);

        res.redirect("/");
    }

    async fail(req, res) {
        res.render("./session/fail", {
            title: "SignUp error",
            type: "SIGNUP",
            originalRoute: "/signup"
        })
    }
}


module.exports = new Registration;