const MongoDB = require("../../index.js");
const { ChatSchema } = require("../../../Models/mongoModels.js");


class ChatDao extends MongoDB {

}

module.exports = new ChatDao("chat", ChatSchema);