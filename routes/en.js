var express = require('express');

var router = express.Router();

var database = require('../database');

router.get('/order', function (req, res, next) {
    res.render('en/order',{ title: 'OrderEN'});
});

router.post('/order', function (req, res, next) {
    const queryString_order_id = 'SELECT order_id from order_income order by order_id desc limit 1';

    database.query(queryString_order_id, function (err, order_id_data) {
        if (err) {
            console.error(err);
        }
        else {
            var noodles_type_tempEN = req.body.noodlesEN;
            var meat_type_tempEN = req.body.meatEN;

            var add_veg_tempEN = req.body.vegEN;
            var veg_tempEN =  "";
            console.log(req.body.vegEN);

            var add_topping_tempEN = req.body.topEN;
            var topping_tempEN = "";
            console.log(req.body.topEN);

            if(add_veg_tempEN === undefined){
                veg_tempEN = "None";
            }
            else if(add_veg_tempEN.length>2){
                for (let i = 0; i < add_veg_tempEN.length; i++) {
                    veg_tempEN += add_veg_tempEN[i];
                }
            }
            else{
                for (let i = 0; i < add_veg_tempEN.length; i++) {
                    if(i<add_veg_tempEN.length-1){
                        veg_tempEN += add_veg_tempEN[i]+", ";
                    }
                    else{
                        veg_tempEN += add_veg_tempEN[i];
                    }
                }
            }

            if(add_topping_tempEN === undefined){
                topping_tempEN = "None";
            }
            else if(add_topping_tempEN.length>4){
                for (let i = 0; i < add_veg_tempEN.length; i++) {
                    topping_tempEN += add_topping_tempEN[i];
                }
            }
            else{
                for (let i = 0; i < add_topping_tempEN.length; i++) {
                    if(i<add_topping_tempEN.length-1){
                        topping_tempEN += add_topping_tempEN[i]+", ";
                    }
                    else{
                        topping_tempEN += add_topping_tempEN[i];
                    }
                }
            }

            var order_id = order_id_data.map(item => [item.order_id]);

            const queryString_detail = 'INSERT INTO order_detail (order_id, noodles_nameEN, meat_nameEN, topping_nameEN, add_veg_nameEN) VALUES (?, ?, ?, ?, ?)';
            database.query(queryString_detail, [order_id, noodles_type_tempEN, meat_type_tempEN, topping_tempEN, veg_tempEN],(err, data) => {
            if(err){
                console.error(err);
            }
            else console.log("Query Successfully.");
            });
        };
    });
    res.redirect('order');
    res.send(req.body);
});

router.get('/order/cart', function(req, res, next) {
    res.render('en/cart', { title: 'CartEN' });
});

module.exports = router;