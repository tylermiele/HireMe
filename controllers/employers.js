const express = require('express');
const router = express.Router();

/* GET employers index (the module home page) */
router.get('/', (req, res) =>{
    res.render('employers/index', {
        title: "Employers List"
    });
});

//export to make this file public
module.exports = router;