const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const { isLoggedIn } = require('../middleware');


// get all products
router.get('/products', async (req, res) => {

    const products = await Product.find();
    res.render('./products/product', { products });

})


// get form to add new product
router.get('/products/new', isLoggedIn, (req, res) => {
    res.render('./products/new');
})


// add a new product
router.post('/products', isLoggedIn, async (req, res) => {
    const product = req.body;
    await Product.create(product);

    req.flash('success', 'your product has been created successfully');

    res.redirect('/products');
})


// show a single product
router.get('/products/:productid', async (req, res) => {
    const { productid } = req.params;
    const product = await Product.findById(productid).populate('review');


    res.render('./products/show', { product });
})


// get the edit form
router.get('/products/:productid/edit', isLoggedIn, async (req, res) => {
    const { productid } = req.params;
    const product = await Product.findById(productid);


    res.render('./products/edit', { product });
})


// update a product
router.patch('/products/:productid', isLoggedIn, async (req, res) => {
    const { productid } = req.params;
    const { name, img, price, description } = req.body;

    const p = await Product.findByIdAndUpdate(productid, { name, img, price, description });

    req.flash('success', 'your product has been updated');

    res.redirect('/products');
})



// delete a product
router.delete('/products/:productid', isLoggedIn, async (req, res) => {
    const { productid } = req.params;

    await Product.findByIdAndDelete(productid);

    res.redirect('/products');
})





module.exports = router;