const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');
const Product = require('../models/Product');
const User = require('../models/User');
const { isLoggedIn } = require('../middleware');


router.post('/products/:productid/review', isLoggedIn, async (req, res) => {
    const { productid } = req.params;
    const { rating, comment } = req.body;


    let review = await Review.create({ rating, comment });

    const product = await Product.findById(productid);
    await product.review.push(review._id);
    await product.save();

    res.redirect(`/products/${productid}`);

})

router.delete('/products/:productid/review/:reviewid', isLoggedIn, async (req, res) => {
    const { productid, reviewid } = req.params;

    const product = await Product.findById(productid);
    await Review.findByIdAndDelete(reviewid);
    const rev = product.review.filter((item) => item._id !== reviewid);
    product.review = rev;
    product.save();
    res.redirect(`/products/${productid}`);
})


router.post('/products/:productid/addcart', isLoggedIn, async (req, res) => {
    const { productid } = req.params;

    const user = await req.user;
    user.products.push(productid);
    await user.save();

    res.redirect('/products');
})


module.exports = router;