const fs = require("fs");

module.exports = class Archive {
    constructor(name) {
        this.name = name
    }

    read = async() => {
        try {
            let content = JSON.parse(await fs.promises.readFile(this.name, "utf-8"));
            return content
        } catch(err) {
            return []
        }
    }

    save = async(record) => {
        try {
            let data = await this.read();
            let id = data.length + 1;
            data.push({id, ...record});
            await fs.promises.writeFile(this.name, JSON.stringify(data));
        } catch(err) {
            console.log("No se pudo guardar", err)
        }
    }

    delete = async() => {
        try {
            await fs.promises.unlink(this.name);
        } catch(err) {
            console.error("No se pudo borrar el archivo", err)
        }
    }
}
