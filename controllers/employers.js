const express = require('express');
const router = express.Router();

//add fs to read the data file
const fs = require('fs');


/* GET employers index (the module home page) */
router.get('/', (req, res) => {
    // const employers = [
    //     {
    //         "name": "Provix"
    //     },
    //     {
    //         "name": "Element6"
    //     },
    //     {
    //         "name": "Netgain"
    //     },
    //     {
    //         "name": "44 North"
    //     }
    // ];
    // res.render('employers/index', {
    //     title: "Employers List",
    //     employers: employers
    // });


    // get data from JSON file
    fs.readFile('./data/employers.json', 'utf8', (err, employers) =>{
        if (err){
            console.log(err);
        }else{
            res.render('employers/index', {
                title: "Employers List",
                employers: JSON.parse(employers)
            });
        }
    });
});

//export to make this file public
module.exports = router;