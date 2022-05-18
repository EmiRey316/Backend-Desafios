class Home {
    get(req, res) {
        res.render("home", {title: "Centro de mensajes"})
    }
}


module.exports = new Home;