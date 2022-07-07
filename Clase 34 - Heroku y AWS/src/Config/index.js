require("dotenv").config();
const parseArgs = require("minimist");


//Options para Minimist
const options = {
    default: {
        PORT: process.env.PORT || 8080,
        MODE: process.env.MODE || "FORK"
    },
    alias: {
        p: "PORT",
        port: "PORT",
        m: "MODE",
        mode: "MODE"
    }
}

const args = parseArgs(process.argv.slice(2), options);


const config = {
    HOST: process.env.HOST || "127.0.0.1",
    PORT: args.PORT,
    MODE: args.MODE.toUpperCase(),
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    SECRET: process.env.SECRET
}


module.exports = config;