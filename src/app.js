const express = require("express")
const path = require("path")
const productsRouter = require("./routes/products.routers.js") 

const app = express()
const PORT = 8080

app.use(express.json()) //Middlewars
app.use(express.urlencoded({ extends: true })) //Middlewars para recibir parametros por url

app.use(express.static(path.join(__dirname, "public")))

app.use("/", productsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

