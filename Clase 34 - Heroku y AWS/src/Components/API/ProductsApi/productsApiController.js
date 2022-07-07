const faker = require("faker");
faker.locale = "es";

class ProductsApi {
    get(req, res) {
        let productList = [];

        for(let i = 1; i <= 5; i++) {
            productList.push({
                name: faker.commerce.product(),
                price: faker.commerce.price(100, 1000),
                photo: faker.image.animals(640, 480, true)
            })
        }

        res.send(productList);
    }
}


module.exports = new ProductsApi;