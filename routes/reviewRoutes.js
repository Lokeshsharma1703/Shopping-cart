const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');
const Product = require('../models/Product');
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


module.exports = router;