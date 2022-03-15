const fs = require("fs");

class Archive {
    constructor(name) {
        this.name = name
    }

    read = async() => {
        try {
            let content = JSON.parse(await fs.promises.readFile(this.name, "utf-8"));
            console.log(content);
            return content
        } catch(err) {
            return []
        }
    }

    save = async(product) => {
        try {
            let data = await this.read();
            let id = data.length + 1;
            data.push(product);
            await fs.promises.writeFile("products.txt", JSON.stringify(data));
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


class Product {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const products = new Archive("products.txt");


let escuadra = new Product("Escuadra", 100, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Squadra_45.jpg/220px-Squadra_45.jpg");
let calculadora = new Product("Calculadora", 200, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Squadra_45.jpg/220px-Squadra_45.jpg");
let globoTerraqueo = new Product("Globo Terraqueo", 300, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Squadra_45.jpg/220px-Squadra_45.jpg");

products.save(escuadra);
products.save(calculadora);
products.save(globoTerraqueo);

products.read();

