var express = require('express');

var router = express.Router();

var database = require('../database');

router.get('/order', function (req, res, next) {
    res.render('en/order',{ title: 'OrderEN'});
});

router.post('/order', function (req, res, next) {
  
    var noodles_type_tempEN = req.body.noodlesEN;
    var meat_type_tempEN = req.body.meatEN;

    var add_veg_tempEN = req.body.vegEN;
    var veg_tempEN =  "";

    var add_topping_tempEN = req.body.topEN;
    var topping_tempEN = "";

    for (let i = 0; i < add_veg_tempEN.length; i++) {
        if(i<add_veg_tempEN.length-1){
            veg_tempEN += add_veg_tempEN[i]+", ";
        }
        else{
            veg_tempEN += add_veg_tempEN[i];
        }
    }

    for (let i = 0; i < add_topping_tempEN.length; i++) {
        if(i<add_topping_tempEN.length-1){
            topping_tempEN += add_topping_tempEN[i]+", ";
        }
        else{
            topping_tempEN += add_topping_tempEN[i];
        }
    }
  
    const queryString = 'INSERT INTO order_detail (noodles_nameEN, meat_nameEN, topping_nameEN, veg_nameEN) VALUES (?, ?, ?, ?)';
    database.query(queryString, [noodles_type_tempEN, meat_type_tempEN, topping_tempEN, veg_tempEN],(err, data) => {
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