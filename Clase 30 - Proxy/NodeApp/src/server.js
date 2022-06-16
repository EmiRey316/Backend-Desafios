const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const config = require("./Config/index.js");
const passport = require("./Components/Session/Passport")


////////////////////////////////////////////
//      Inicialización del servidor       //
////////////////////////////////////////////
const app = express();
let server;

const forkInit = () => {
    server = app.listen(config.PORT, config.HOST, () => {
        console.log(`Server on HOST: ${config.HOST} and PORT: ${config.PORT}, with PROCESS: ${process.pid}`);
    })    
}

const clusterInit = () => {
    if(cluster.isMaster) {
        console.log(`Master ${process.pid} is running`)

        for(let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} stop`);
            cluster.fork();
        })

    } else {
        server = app.listen(config.PORT, config.HOST, () => {
            console.log(`Server on HOST: ${config.HOST} and PORT: ${config.PORT}, with PROCESS: ${process.pid}`)
        })
    }
}


//Selección del tipo dependiendo del MODE.
switch(config.MODE) {
    case "CLUSTER":
        clusterInit();
        break;
    case "FORK":
        forkInit();
        break;
    default:
        forkInit();
        break;
}



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

app.use(passport.initialize());
app.use(passport.session());



module.exports = {app, server};