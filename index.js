// const http = require('http');

// const server = http.createServer((req, res) => {

//     console.log(req)

//     if (req.url == "/home") {
//         res.end("Home Page");
//     }
//     else {
//         res.end("/ Page");
//     }

// });

// server.listen(1234, () => {
//     console.log("Server is running on http://localhost:1234")
// });



// import express from 'express';   ES6 way of importing modules  in nodejs
const express = require('express'); // Common JS way of importing module in NodeJS 


const productData = require('./data');
// import productData from './data'

// console.log(typeof productData)


const app = express();
app.use(express.json());
// app.use(express.text());
// console.log(app)



app.get("/products", (req, res) => {
    return res.send(productData);
});


// GET Method 

app.get("/products/:id", (req, res) => {
    let id = req.params.id;
    const find_obj = productData.find((obj) => obj.id === parseInt(id));
    if (!find_obj) { // find_obj  will be undefined if no object matches the condition
        return res.status(404).send(`No product with the id ${id}`);
    }

    // console.log(find_obj);
    // console.log(id);
    // console.log(req.body);
    return res.send(find_obj);
});






// POST Method 

app.post("/addproduct", (req, res) => {

    // console.log(req.body);
    if (!req.body.title || !req.body.price || !req.body.image) {
        res.status(400).send("Missing Data");
        return;
    };

    const newProduct = { id: productData.length + 1, ...req.body };

    productData.push(newProduct);
    // console.log(productData);
    return res.send(newProduct);
});





// PUT Method 

app.put('/updateproduct/:id', (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    const id = req.params.id;

    const index = productData.findIndex((obj) => obj.id === +id);
    console.log(index);

    if (index === -1) {
        return res.status(400).json({ "error": "Product Not Found" })
    }

    const updateProduct = { ...productData[index], ...req.body };
    // console.log(updateProduct)

    productData[index] = updateProduct;
    // console.log(productData)

    return res.send(updateProduct);

});







// DELETE Method 

app.delete("/removeproduct/:id", (req, res) => {
    let id = req.params.id;

    // let remainingProducts = productData.filter((obj) => obj.id !== +id);
    // if (remainingProducts.length == productData.length) {
    //     return res.status(400).json(`No Product with given ID ${id} found`)
    // };
    // console.log(remainingProducts);


    let index = productData.findIndex((obj) => obj.id === +id);
    if (index === -1) {
        return res.status(400).json({ "error": `No Product with given ID ${id} found` })
    };
    productData.splice(index, 1);

    return res.send(productData);
});










// PATCH Method 

app.patch('/likeproduct/:id', (req, res) => {
    let id = req.params.id;
    let index = productData.findIndex((item) => item.id == id);

    if (index === -1) {
        return res.status(400).json({ 'error': 'The provided id was not found.' });
    }

    let item = productData[index];

    if (item.likes == null) {
        item.likes = 1;
    } else {
        item.likes += 1;
    }

    productData[index] = item;
    console.log(productData);
    return res.json(item);
});









app.listen(2244, () => {
    console.log("Server is running on http://localhost:2244")
});

