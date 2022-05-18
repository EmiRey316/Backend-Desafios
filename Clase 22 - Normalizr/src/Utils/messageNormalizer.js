const { schema } = require("normalizr");

const authorSchema = new schema.Entity("author", {}, {idAttribute: "email"});
const chatSchema = new schema.Entity("chat", { chat: [{author: authorSchema}] });

module.exports = chatSchema;