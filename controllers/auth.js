const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => {
    let messages = req.session.messages?.message;
    //clear session error message
    req.session.messages = [];
    res.render('auth/register', {
        title: "Register",
        messages: messages
    });
});

router.post('/register', (req, res) => {
    //use User model to try creating a new user
    //User model extends plm, so it does duplicate checks and hashes passwords
    User.register(new User({
        username: req.body.username
    }), req.body.password,
        (err, user) => {
            if (err) {
                //store session var so we can display it after redirecting
                // console.log(err);
                req.session.messages = err;
                res.redirect('/auth/register');
            } else {
                res.redirect('/employers');
            }
        })
});

router.get('/login', (req, res) => {
    let messages = req.session.messages;
    req.session.messages = [];
    res.render('auth/login', {
        title: "Login",
        messages: messages
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/employers',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login',
}));

router.get('/logout', (req, res) => {
    req.session.messages = [];
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});

// google auth
router.get("/google", passport.authenticate('google', {
    scope: ['profile']
}), (req, res) =>{});

router.get("/google/callback", passport.authenticate('google',{
    successRedirect: '/employers',
    failureRedirect: '/auth/login',
    failureMessage: 'Could not authenticate with Google.'
}));
module.exports = router;
