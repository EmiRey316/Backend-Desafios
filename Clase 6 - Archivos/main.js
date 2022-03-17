import fs from "fs";

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


//Función para cargar nuevos productos con el formato adecuado.
const newProduct = async(title, price, thumb) => {
    await products.save({
        title: title,
        price: price,
        thumbnail: thumb
    })
}


const products = new Archive("./products.txt");


const saves = async() => {
    await newProduct("Escuadra", 100, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Squadra_45.jpg/220px-Squadra_45.jpg");
    await newProduct("Calculadora", 200, "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Casio_fx-85WA_20050529.jpg/330px-Casio_fx-85WA_20050529.jpg");
    await newProduct("Globo Terraqueo", 300, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/GlobeSK.jpg/450px-GlobeSK.jpg");

    await products.read();
}
saves();