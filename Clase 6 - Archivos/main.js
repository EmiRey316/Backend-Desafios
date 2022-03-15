const fs = require("fs");

//Clase pedida en el desafío.
class Archive {
    constructor(name) {
        this.name = name
    }

    read = async() => {
        try {
            let content = JSON.parse(await fs.promises.readFile(this.name, "utf-8"));
            //console.log pedido por letra.
            console.log(content);
            //También uso return para darle mayor utilidad al método.
            return content
        } catch(err) {
            return []
        }
    }

    save = async(product) => {
        try {
            let data = await this.read();
            let id = data.length + 1;
            data.push({...product, id: id});
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


//Clase para cargar los productos más facilmente.
class Product {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const products = new Archive("products.txt");


let escuadra = new Product("Escuadra", 100, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Squadra_45.jpg/220px-Squadra_45.jpg");
let calculadora = new Product("Calculadora", 200, "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Casio_fx-85WA_20050529.jpg/330px-Casio_fx-85WA_20050529.jpg");
let globoTerraqueo = new Product("Globo Terraqueo", 300, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/GlobeSK.jpg/450px-GlobeSK.jpg");

const saves = async() => {
    await products.save(escuadra);
    await products.save(calculadora);
    await products.save(globoTerraqueo);

    await products.read();
}
saves();


