const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");


const config = require("./Config/index.js");
const usersList = require("./Container/DAOs/users");



////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////
const app = express();
const server = app.listen(config.PORT, config.HOST, () => {
    console.log(`Server on HOST: ${config.HOST} and PORT: ${config.PORT}`);
})

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Para que los res.json se vean mejor en el browser.
app.set("json spaces", 2);



////////////////////////////////////////////
//            Conexión MongoDB            //
////////////////////////////////////////////
(async () => {
    try {
        await mongoose.connect(config.MONGO_ATLAS_URL);
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
        mongoUrl: config.MONGO_ATLAS_URL,
        mongoOptions: advancedOptions
    }),

    secret: config.SECRET,
    cookie: {maxAge: 6000000}, //1 min de session
    rolling: true,
    resave: true,
    saveUninitialized: true
}))



////////////////////////////////////////////
//                Passport                //
////////////////////////////////////////////
passport.use("login", new LocalStrategy(async (username, password, done) => {
    try {
        let user = await usersList.findByEmail(username);
        if(!user) return done(null, false);

        if(!await bcrypt.compare(password, user.password)) return done(null, false);

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

            let user = req.body;
            
            user.password = await bcrypt.hash(user.password, 10);
            console.log(user.password)
            
            
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