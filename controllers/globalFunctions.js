const express = require('express');

//make public function that can be used anywhere
exports.isAuthenticated = (req, res, next) => {
    // if the user in logged in, call next to allow themm to continue whaever they were doing
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
};