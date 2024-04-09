var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function (req, res, next) {
    const time_query = "SELECT order_time FROM order_income";
    const price_query  = "SELECT total_price,order_id FROM payment";
    const detail_query = "SELECT noodles_nameEN	,noodles_nameTH	,meat_nameEN ,meat_nameTH ,topping_nameEN ,topping_nameTH ,veg_nameEN, veg_nameTH FROM order_detail";
    const submit_query = "SELECT order_id, Detail_id, customer_id, serve FROM submit_order";
    database.query(time_query, (err, time_result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Error executing query");
          return;
        }
  
        database.query(price_query, (err, price_result) => {
            if (err) {
                console.error("Error executing query:", err);
                res.status(500).send("Error executing query");
                return;
            }
  
            database.query(detail_query, (err, detail_result) => {
                if (err) {
                    console.error("Error executing query:", err);
                    res.status(500).send("Error executing query");
                    return;
                }
  
                database.query(submit_query, (err, submit_result) => {
                    if (err) {
                        console.error("Error executing query:", err);
                        res.status(500).send("Error executing query");
                        return;
                    }

                    res.render("admin", 
                    {title: "Admin",
                    time: time_result,
                    price: price_result,
                    detail: detail_result,
                    submit: submit_result
                    });
                });
            });
        });
    });
});

router.get('/ingredient', function (req, res, next) {
    res.render('admin/ingredient', { title: 'Admin' });
});

module.exports = router;