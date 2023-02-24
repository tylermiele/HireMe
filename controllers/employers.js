const express = require('express');
const employer = require('../models/employer');
const router = express.Router();

//add fs to read the data file
// const fs = require('fs');

//use Employer model for crud with mongoose
const Employer = require('../models/employer');
const City = require('../models/city');

//global auth check to make most methods private
const global = require('../controllers/globalFunctions');

/* GET employers index (the module home page) */
router.get('/', (req, res) => {
    // get data from mongodb using employer model
    Employer.find((err, employers) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(employers);
            res.render('employers/index', {
                title: 'Employer List',
                employers: employers
            });
        }
    });
});

//GET /create - display form to add an employer
//make method private, calls function before the req,res
router.get('/create', global.isAuthenticated, (req, res) => {
    //use City model to fetch list of cities from db to populate city dropdown
    City.find((err, cities) => {
        if (err) {
            console.log(err);
        } else {
            res.render('employers/create', {
                cities: cities,
                title: 'Hire Me | Create Employer'
            });
        };
    }).sort('name');
});

//POST /create - submit form data to mongoDB
router.post('/create', global.isAuthenticated, (req, res) => {
    Employer.create(req.body, (err, newDocument) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/employers');
        };
    });
});

// GET /delete/id => delete selected emplyer document using the url param
router.get('/delete/:_id', global.isAuthenticated, (req, res) => {
    Employer.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/employers');
        };
    });
});

// GET /edit/id => fetch and display selected employer 
router.get('/edit/:_id', global.isAuthenticated, (req, res) => {
    Employer.findById(req.params._id, (err, employer) => {
        if (err) {
            console.log(err);
        } else {
            City.find((err, cities) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('employers/edit', {
                        employer: employer,
                        cities: cities,
                        title: "Hire Me | Edit"
                    });
                };
            }).sort('name');
        };
    });
});

// POST /edit/id => update selected employer
router.post('/edit/:_id', global.isAuthenticated, (req, res) => {
    Employer.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/employers');
        }
    });
});

// GET /details/id => view details of one employer, displays comments
router.get('/details/:_id', (req, res) => {
    Employer.findById(req.params._id, (err, employer) => {
        if (err) {
            console.log(err);
        } else {
            City.find((err, cities) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('employers/details', {
                        employer: employer,
                        cities: cities,
                        title: "Hire Me | Details"
                    });
                };
            }).sort('name');
        };
    });
});

//export to make this file public
module.exports = router;