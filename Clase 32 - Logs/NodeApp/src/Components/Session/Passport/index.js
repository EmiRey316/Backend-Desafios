const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const usersList = require("../../../Container/DAOs/users");


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
            if(findUser) return done(null, false);

            let user = req.body;
            
            user.password = await bcrypt.hash(user.password, 10);            
            
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



module.exports = passport;