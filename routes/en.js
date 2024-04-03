var express = require('express');

var router = express.Router();

var database = require('../database');

router.get('/order', function (req, res, next) {
    res.render('en/order',{ title: 'Order'});
});

router.post('en/order', function (req, res, next) {
  
    var noodles_type_tempEN = req.body.noodlesEN;
    var meat_type_tempEN = req.body.meatEN;
    var add_veg_tempEN = req.body.vegEN;
    var add_topping_tempEN = req.body.topEN;
  
    const queryString = 'INSERT INTO order_detail (noodlesEN, meatEN, vegEN, topEN) VALUES (?, ?, ?, ?)';
    database.query(queryString, [noodles_type_tempEN, meat_type_tempEN, add_veg_tempEN, add_topping_tempEN],(err, data) => {
      if(err){
        console.error(err);
      }
      else console.log("Query Successfully.");
    });

});

router.get('/order/cart', function(req, res, next) {
    res.render('en/cart', { title: 'CartEN' });
});

module.exports = router;