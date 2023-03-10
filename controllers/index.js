const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    user: req.user 
  });
});

/* GET /about */
router.get('/about', (req, res) => {
  //get the current date and pass it to view to display

  res.render('about', {
    title: "About Us",
    user: req.user
  });
});

module.exports = router;
