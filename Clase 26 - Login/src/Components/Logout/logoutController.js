class Logout {
    get(req, res) {
        let user = req.session.user;
        req.session.destroy(err => {
            if(!err) {
                return res.render("./session/logout", {user: user});
            }

            res.send({status: "Logout ERROR",
                body: err})
        })
    }
}


module.exports = new Logout()