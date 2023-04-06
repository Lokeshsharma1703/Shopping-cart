const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');


router.get('/products/user/cart', isLoggedIn, (req, res) => {
    res.render('products/cart');
})


module.exports = router;