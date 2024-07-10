const express = require("express")
const fs = require('fs');

const app = express()
const PORT = 8080

app.use(express.json())
//Middlewars
app.use(express.urlencoded({ extends: true }))

//Creacion de un endpoint 

app.get('/api/products', (req, res) => {

    // Lee el archivo "productos.json"
    fs.readFile('data/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const products = JSON.parse(data);
        const limit = req.query.limit;

        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    });
});

app.get('/api/products/:pid', (req, res) => {

    // Lee el archivo "productos.json"
    fs.readFile('data/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const products = JSON.parse(data);
        const id = req.params.pid;
        const product = products.find(product => product.id === parseInt(id));

        console.log(id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    });
});

// Ruta para agregar un nuevo producto

app.post('/api/products', (req, res) => {

    const { title, description, code, price, status, stock, category } = req.body;
    console.log(req.body.title)

    // Lee el archivo "productos.json"
    fs.readFile('data/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const products = JSON.parse(data);
        const id = products.length + 1;

        const newProduct = { id, title, description, code, price, status, stock, category };

        products.push(newProduct);

        // Escribe los productos actualizados en el archivo "productos.json"

        fs.writeFile('data/products.json', JSON.stringify(products, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(newProduct);
        });
    });
});

app.put('/api/products/:pid', (req, res) => {

    const { title, description, code, price, status, stock, category } = req.body;
    console.log(req.body.title)

    // Lee el archivo "productos.json"
    fs.readFile('data/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const products = JSON.parse(data);
        const id = parseInt(req.params.pid);
        //const newProduct = { id, title, description, code, price, status, stock, category };

        const product = products.find((prod) => prod.id === id)
        if (product) {
            
            product.title = title
            product.description = description
            product.code = code
            product.price = price
            product.status = status
            product.stock = stock
            product.category = category

            //res.json(product)
        } else {
            res.status(404).json({ message: "Tarea no encontrada" })
        }

        fs.writeFile('data/products.json', JSON.stringify(products, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(product);
        });
    });
});

app.delete('/api/products/:pid', (req, res) => {

    console.log(req.body.title)

    // Lee el archivo "productos.json"
    fs.readFile('data/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const products = JSON.parse(data);
        const id = parseInt(req.params.pid);

        const product = products.filter((prod) => prod.id !==  id)

        fs.writeFile('data/products.json', JSON.stringify(product, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json({ message: `Tarea con id ${id} eliminada correctamente` })
        });
    });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})

