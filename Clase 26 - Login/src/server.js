const express = require("express");
const mongoose = require("mongoose");
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
//            Conexión MongoDB            //
////////////////////////////////////////////
(async () => {
    try {
        await mongoose.connect(MONGO_ATLAS_URL);
        console.log("Base Mongo conectada");
    
    } catch(err) {
        console.error(`Error: ${err}`)
    }
})()



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
    cookie: {maxAge: 6000000}, //1 min de session
    rolling: true,
    resave: true,
    saveUninitialized: true
}))



////////////////////////////////////////////
//                Passport                //
////////////////////////////////////////////
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const usersList = require("./Container/DAOs/users")

passport.use("login", new LocalStrategy(async (username, password, done) => {
    try {
        let user = await usersList.findByEmail(username);
        if(!user) return done(null, false);

        if(user.password !== password) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        console.error("Error en login", error)
    }
}))

passport.use("signup", new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            let findUser = await usersList.findByEmail(username);
            if(findUser) return done("El usuario ya está registrado");

            user = req.body;
            await usersList.save(user);

            return done(null, user);
        } catch (error) {
            console.error("Error en login", error)
        }
}))



passport.serializeUser((user, done)=>{
    done(null, user.username);
});

passport.deserializeUser((username, done)=>{
    let user = usersList.findByEmail(username);
    done(null, user);
});


app.use(passport.initialize());
app.use(passport.session());



module.exports = {app, server, passport};