const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');




router.get('/register', (req, res) => {
    res.render('auth/signup');
})


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email });

    const newUser = await User.register(user, password);

    req.flash('success', 'You have registered successfully');

    res.redirect('/login');
})


// router.get('/fakeUser', async (req, res) => {
//     const user = new User({ username: 'fakeuser', email: 'abc@gmail.com' });
//     const newUser = await User.register(user, '12345');

//     res.send(newUser);
// })


router.get('/login', (req, res) => {
    res.render('auth/signin');
})


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Login error,please try again!'
}), (req, res) => {
    req.flash('success', `${req.user.username.toUpperCase()}, your login was successfull`);
    res.redirect('/products');
})

router.get('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'GoodBye, see you again');
        res.redirect('/login');
    }
    )
})



module.exports = router;