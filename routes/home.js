var express = require('express');

var router = express.Router();

var database = require('../database');

router.get('/', function (req, res, next) {
    res.render('home', { title: 'Homepage' });
});

router.post('/', function (req, res, next) {

    var tel_temp = req.body.customer_tel;

    const queryString_cus = 'INSERT INTO customer (customer_tel) VALUES (?)'
    database.query(queryString_cus, [tel_temp], (err, data) => {
        if (err) {
            console.error(err);
        }
        else console.log("Query Customer Incoming Successfully.");
    });

    const queryString_customer_id = 'SELECT customer_id from customer order by customer_id desc limit 1';

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
    });

});

module.exports = router;