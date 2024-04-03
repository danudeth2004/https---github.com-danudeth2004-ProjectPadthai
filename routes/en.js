var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/order", (req, res, next) => {

    const noodles_query = "SELECT noodles_nameEN FROM noodles_type;";
    const meat_query = "SELECT meat_nameEN FROM meat_type;";
    const topping_query = "SELECT topping_nameEN FROM topping_list;";
    const veg_query = "SELECT veg_nameEN FROM veg_list;";
  
    database.query(noodles_query, (err, noodles_result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Error executing query");
          return;
        }
  
        database.query(meat_query, (err, meats_result) => {
            if (err) {
                console.error("Error executing query:", err);
                res.status(500).send("Error executing query");
                return;
            }
  
            database.query(topping_query, (err, toppings_result) => {
                if (err) {
                    console.error("Error executing query:", err);
                    res.status(500).send("Error executing query");
                    return;
                }
  
                database.query(veg_query, (err, vegs_result) => {
                    if (err) {
                        console.error("Error executing query:", err);
                        res.status(500).send("Error executing query");
                        return;
                    }
  
                    res.render("en/order", 
                    {title: "OrderEN",
                    noodles: noodles_result,
                    meats: meats_result,
                    toppings: toppings_result,
                    vegs: vegs_result 
                    });
                });
            });
        });
    });
});

router.post('/order', function (req, res, next) {
    
    /* customer & order_income */
    /*var tel_temp = req.body.customer_tel;

    const queryString_cus = 'INSERT INTO customer (customer_tel) VALUES (?)'
    database.query(queryString_cus, [tel_temp], (err, data) => {
        if (err) {
            console.error(err);
        }
        else console.log("Query Customer Incoming Successfully.");
    });
    
    const queryString_customer_id = 'SELECT customer_id FROM customer ORDER BY customer_id DESC LIMIT 1';

    database.query(queryString_customer_id, function (err, cus_id_data) {
        if (err) {
            console.error(err);
        }
        else {
            var order_date_temp = req.body.order_date;
            var order_time_temp = req.body.order_time;
            var values = cus_id_data.map(item => [item.customer_id]);

            const queryString_income = 'INSERT INTO order_income (order_date, order_time, customer_id) VALUES (?,?,?)'
            database.query(queryString_income, [order_date_temp, order_time_temp, values], (err, data) => {
                if (err) {
                    console.error(err);
                }
                else console.log("Query Order Incoming Successfully.");
            });
        };
    });*/

    /* order_detail */

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
    
    const queryString_detail = 'INSERT INTO order_detail (noodles_nameEN, meat_nameEN, topping_nameEN, veg_nameEN) VALUES (?, ?, ?, ?)';
    database.query(queryString_detail, [noodles_type_tempEN, meat_type_tempEN, topping_tempEN, veg_tempEN],(err, data) => {
    if(err){
        console.error(err);
    }
    else console.log("Query Successfully.");

    });
    res.redirect('order');
});

router.get('/order/cart', function(req, res, next) {
    res.render('en/cart', { title: 'CartEN' });
});

module.exports = router;