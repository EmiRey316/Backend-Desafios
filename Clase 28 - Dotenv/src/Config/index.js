require("dotenv").config();
const parseArgs = require("minimist");


const args = parseArgs(process.argv.slice(2));

const config = {
    HOST: process.env.HOST || "127.0.0.1",
    PORT: args._[0] || 8080,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    SECRET: process.env.SECRET
}


module.exports = config;