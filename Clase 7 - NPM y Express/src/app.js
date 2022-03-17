import express from "express";
import fs from "fs";


//Inicializo express y el resto de constantes.
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})


//Función que lee el archivo que contiene el listado de productos.
const productList = async() => {
    try {
        let content = JSON.parse(await fs.promises.readFile("../Clase 6 - Archivos/products.txt", "utf-8"));
        return content
    } catch(err) {
        return []
    }
}


//Función para buscar un producto random
const randomProduct = async() => {
    let itemList = await productList();
    let randomIndex = Math.floor(Math.random()*(itemList.length - 1));
    return itemList[randomIndex];
}



let itemsVisits = 0;
app.get("/items", async (req, res) => {
    itemsVisits++;
    let itemList = await productList();
    res.send({items: await itemList, amount: itemList.length});
})

let randomItemVisits = 0;
app.get("/random-item", async (req, res) => {
    randomItemVisits++;
    res.send(await randomProduct());
})

app.get("/visits", (req, res) => {
    res.send({
        visitas: {
            items: itemsVisits,
            radomItem: randomItemVisits
        }
    })
})