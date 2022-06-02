const MongoDB = require("../../index.js");
const { UsersSchema } = require("../../../Models/mongoModels.js");


class UsersDao extends MongoDB {
    findByEmail = async(userMail) => {
        try {
            return await this.model.findOne({email: userMail});
        } catch (error) {
            console.error("No se pudo buscar el usuario", error)
        }
    }
}


module.exports = new UsersDao("users", UsersSchema);