const chatMongo = require("../../Container/DAOs/chat");

class HomeService {
    async read() {
        return await chatMongo.read();
    }

    async saveMessage(message) {
        await chatMongo.save(message);
    }
}

module.exports = new HomeService;