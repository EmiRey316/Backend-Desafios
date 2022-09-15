class DataBase {
    constructor(options, tableName) {
        this.knex = require("knex")(options),
        this.table = tableName
    }

    read() {
        let result = this.knex.from(this.table).select("*");
        return result.then(rows => {
            return rows
        }).catch(err => {
            console.log("Error al leer tabla", err);
            throw err
        })

    }

    save = (record) => {
        this.knex(this.table).insert(record)
            .then(() => console.log("Data insertada en " + this.table))
            .catch(err => {
                console.log("Error al guardar en tabla", err);
                throw err
            })
    }

    delete = async() => {
        try {
            await fs.promises.unlink(this.table);
        } catch(err) {
            console.error("No se pudo borrar el archivo", err)
        }
    }
}


module.exports = DataBase;