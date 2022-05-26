class Home {
    get(req, res) {
        res.render("home", {title: "Centro de mensajes", user: req.session.user, avatar: req.session.avatar})
    }
}


module.exports = new Home;