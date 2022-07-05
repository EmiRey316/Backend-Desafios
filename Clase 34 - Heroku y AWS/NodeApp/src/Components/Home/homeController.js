class Home {
    async get(req, res) {
        let user = await req.user;
        res.render("home", {title: "Centro de mensajes", alias: user.alias, avatar: user.avatar})
    }
}


module.exports = new Home;