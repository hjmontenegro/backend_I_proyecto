const express = require("express");
const router = express.Router();
const fs = require('fs');

router.post('/api/carts', (req, res) => {

    // Lee el archivo "carts.json"
    fs.readFile('data/carts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const carts = (data === "")? [] : JSON.parse(data);
        const id = carts.length + 1;

        const newCarts = { id, products : [] }
        carts.push(newCarts);

        // Escribe los productos actualizados en el archivo "productos.json"
        fs.writeFile('data/carts.json', JSON.stringify(carts, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(newCarts);
        });
    });
});

router.post('/api/carts/:cid/product/:pid', (req, res) => {
    // Lee el archivo "carts.json"
    fs.readFile('data/carts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const carts = JSON.parse(data);
        const products = BuscarProductos();
        const carts_id = req.params.cid;
        const producto_id = req.params.pid;

        console.log(products)

        const cart = carts.find(cart => cart.id === parseInt(carts_id));
        const product = products.find(product => product.id === parseInt(producto_id));

        //const newCarts = { id, products { title, description };

        if (cart && product) {
            const Cartproduct = cart.products.find(product => product.id === parseInt(producto_id));

            console.log(Cartproduct)

            if(Cartproduct) {
                Cartproduct.quantity += 1;
            } else {
                const newProduct = {producto_id, quantity:1}
                cart.products.push(newProduct);

                res.json(cart.products);
            }

            // Escribe los productos actualizados en el archivo "carts.json"
            fs.writeFile('data/carts.json', JSON.stringify(cart, null, 2), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.json(cart);
            });

        } else {
            if(!cart)
                res.status(404).json({ error: 'Cart no encontrado' });
            else
                res.status(404).json({ error: 'Product no encontrado' });
        }
    });
});

function BuscarProductos () {
    // Lee el archivo "products.json"
    fsDos.readFile('data/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return JSON.parse(data);
    });

}

module.exports = router