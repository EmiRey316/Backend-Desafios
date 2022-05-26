const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { PORT, MONGO_ATLAS_URL, SECRET } = require("./Config/index.js");


////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////
const app = express();
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


////////////////////////////////////////////
//       Inicialización del session       //
////////////////////////////////////////////
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_ATLAS_URL,
        mongoOptions: advancedOptions
    }),

    secret: SECRET,
    cookie: {maxAge: 600000}, //10 min de session
    resave: true,
    saveUninitialized: true
}))



module.exports = {app, server};