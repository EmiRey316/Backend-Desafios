class DataBase {
    constructor() {
        this.knex = require("knex")({
            client: "sqlite3",
            connection: {
                filename: "../DB/chat.sqlite"
            },
            useNullAsDefault: true
        })
    }

    read = () => {
        this.knex.schema.createTable("chat", table => {
            table.increments("id");
            table.string("user");
            table.string("message");
            table.string("date");
        })

        this.knex.from("chat").select("*")
            .then(rows => {return rows})
            .catch(err => {
                console.log("Error al leer tabla", err);
                throw err
            })
            .finally(() => this.knex.destroy())
    }

    save = (record) => {
        console.log("record: ", record)
        this.knex("chat").insert([
            {
                user: record.user,
                message: record.message,
                date: record.date
            }
        ])
    }

    delete = async() => {
        try {
            await fs.promises.unlink(this.name);
        } catch(err) {
            console.error("No se pudo borrar el archivo", err)
        }
    }
}


module.exports = DataBase;