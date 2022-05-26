class Home {
    get(req, res) {
        res.render("home", {title: "Centro de mensajes", user: req.session.user})
    }
}


module.exports = new Home;