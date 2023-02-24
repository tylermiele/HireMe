const express = require('express');
const router = express.Router();

router.get('/register', (req, res) =>{
    res.render('auth/register', {
        title: "Hire Me | Register"
    });
});
router.get('/login', (req, res) =>{
    res.render('auth/login', {
        title: "Hire Me | Login"
    });
});

module.exports = router;
