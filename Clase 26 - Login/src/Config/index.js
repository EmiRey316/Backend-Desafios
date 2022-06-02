require("dotenv").config();

const config = {
    PORT: process.env.PORT,
    ROOT_URL: process.env.ROOT_URL,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    SECRET: process.env.SECRET
}


module.exports = config;