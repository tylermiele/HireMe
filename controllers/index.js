const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

/* GET /about */
router.get('/about', (req, res) => {
  //get the current date and pass it to view to display
  let date = new Date();

  res.render('about', {
    title: "About Us",
    date: date
  });
});

module.exports = router;
