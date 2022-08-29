const { schema } = require("normalizr");

const authorSchema = new schema.Entity("author", {}, {idAttribute: "name"});
const chatSchema = new schema.Entity("chat", { chat: [{author: authorSchema}] });

module.exports = chatSchema;