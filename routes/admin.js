var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function (req, res, next) {

    const time_query = "SELECT order_time FROM order_income;";
    const price_query  = "SELECT total_price,order_id,status FROM payment;";
    const detail_query = "SELECT Detail_id,noodles_nameEN,noodles_nameTH,meat_nameEN,meat_nameTH,topping_nameEN,topping_nameTH,veg_nameEN,veg_nameTH FROM order_detail;";
    const submit_query = "SELECT order_id,Detail_id,customer_id,serve FROM submit_order;";
    const minNonserve = "SELECT MIN(order_id) AS order_min FROM submit_order WHERE serve=0;";
    
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
                    database.query(minNonserve, (err, min_result) => {
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
                        submit: submit_result,
                        min: min_result
                        });
                    });
                });
            });
        });
    });
});

router.post('/', function (req, res, next) {
    var indexId = req.body.indexId;
    const update_payment = "UPDATE payment SET status=1 WHERE payment_id=?";
    database.query(update_payment, [indexId], (err, data) => {
        if (err) {
            console.error(err);
        }
        else console.log("Update Status Payment Successfully.");
    });
    const update_serve = "UPDATE submit_order SET serve=1 WHERE order_id=?";
    database.query(update_serve, [indexId], (err, data) => {
        if (err) {
            console.error(err);
        }
        else console.log("Update Serve Already Submit Successfully.");
    });
    res.redirect('admin');
}); 

router.get('/ingredient', function (req, res, next) {
    const noodles_query = "SELECT noodles_nameEN,noodles_nameTH,price,status FROM noodles_type;";
    const meat_query = "SELECT meat_nameEN,meat_nameTH,price,status FROM meat_type;";
    const topping_query = "SELECT topping_nameEN,topping_nameTH,price,status FROM topping_list;";
    const veg_query = "SELECT veg_nameEN,veg_nameTH,price,status FROM veg_list;";

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

                    res.render("admin/ingredient", 
                    {title: "Ingredient",
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

router.post('/ingredient', function (req, res, next) {
    var noodle1 = req.body.noodle_status1;
    var noodle2 = req.body.noodle_status2;
    var noodle3 = req.body.noodle_status3;
    var noodle4 = req.body.noodle_status4;
    var noodle5 = req.body.noodle_status5;

    var meat1 = req.body.meat_status1;
    var meat2 = req.body.meat_status2;

    var veg1 = req.body.veg_status1;
    var veg2 = req.body.veg_status2;

    var topping1 = req.body.topping_status1;
    var topping2 = req.body.topping_status2;
    var topping3 = req.body.topping_status3;
    var topping4 = req.body.topping_status4;

    if(noodle1 === 'on') noodle1 = 1; else noodle1 = 0;
    if(noodle2 === 'on') noodle2 = 1; else noodle2 = 0;
    if(noodle3 === 'on') noodle3 = 1; else noodle3 = 0;
    if(noodle4 === 'on') noodle4 = 1; else noodle4 = 0;
    if(noodle5 === 'on') noodle5 = 1; else noodle5 = 0;

    if(meat1 === 'on') meat1 = 1; else meat1 = 0;
    if(meat2 === 'on') meat2 = 1; else meat2 = 0;

    if(veg1 === 'on') veg1 = 1; else veg1 = 0;
    if(veg2 === 'on') veg2 = 1; else veg2 = 0;

    if(topping1 === 'on') topping1 = 1; else topping1 = 0;
    if(topping2 === 'on') topping2 = 1; else topping2 = 0;
    if(topping3 === 'on') topping3 = 1; else topping3 = 0;
    if(topping4 === 'on') topping4 = 1; else topping4 = 0;

    const queryNoodles_status1 = 'UPDATE noodles_type SET status=? WHERE id=1';
    database.query(queryNoodles_status1, [noodle1], (err, data) => {});
    const queryNoodles_status2 = 'UPDATE noodles_type SET status=? WHERE id=2';
    database.query(queryNoodles_status2, [noodle2], (err, data) => {});
    const queryNoodles_status3 = 'UPDATE noodles_type SET status=? WHERE id=3';
    database.query(queryNoodles_status3, [noodle3], (err, data) => {});
    const queryNoodles_status4 = 'UPDATE noodles_type SET status=? WHERE id=4';
    database.query(queryNoodles_status4, [noodle4], (err, data) => {});
    const queryNoodles_status5 = 'UPDATE noodles_type SET status=? WHERE id=5';
    database.query(queryNoodles_status5, [noodle5], (err, data) => {});

    const queryMeat_status1 = 'UPDATE meat_type SET status=? WHERE id=1';
    database.query(queryMeat_status1, [meat1], (err, data) => {});
    const queryMeat_status2 = 'UPDATE meat_type SET status=? WHERE id=2';
    database.query(queryMeat_status2, [meat2], (err, data) => {});

    const queryVeg_status1 = 'UPDATE veg_list SET status=? WHERE id=1';
    database.query(queryVeg_status1, [veg1], (err, data) => {});
    const querVeg_status2 = 'UPDATE veg_list SET status=? WHERE id=2';
    database.query(querVeg_status2, [veg2], (err, data) => {});

    const queryTopping_status1 = 'UPDATE topping_list SET status=? WHERE id=1';
    database.query(queryTopping_status1, [topping1], (err, data) => {});
    const queryTopping_status2 = 'UPDATE topping_list SET status=? WHERE id=2';
    database.query(queryTopping_status2, [topping2], (err, data) => {});
    const queryTopping_status3 = 'UPDATE topping_list SET status=? WHERE id=3';
    database.query(queryTopping_status3, [topping1], (err, data) => {});
    const queryTopping_status4 = 'UPDATE topping_list SET status=? WHERE id=4';
    database.query(queryTopping_status4, [topping2], (err, data) => {});
    
    var noodle1_p = req.body.noodle_price1;
    var noodle2_p = req.body.noodle_price2;
    var noodle3_p = req.body.noodle_price3;
    var noodle4_p = req.body.noodle_price4;
    var noodle5_p = req.body.noodle_price5;

    var meat1_p = req.body.meat_price1;
    var meat2_p = req.body.meat_price2;

    var veg1_p = req.body.veg_price1;
    var veg2_p = req.body.veg_price2;

    var topping1_p = req.body.topping_price1;
    var topping2_p = req.body.topping_price2;
    var topping3_p = req.body.topping_price3;
    var topping4_p = req.body.topping_price4;

    const queryNoodles_price1 = 'UPDATE noodles_type SET price=? WHERE id=1';
    database.query(queryNoodles_price1, [noodle1_p], (err, data) => {});
    const queryNoodles_price2 = 'UPDATE noodles_type SET price=? WHERE id=2';
    database.query(queryNoodles_price2, [noodle2_p], (err, data) => {});
    const queryNoodles_price3 = 'UPDATE noodles_type SET price=? WHERE id=3';
    database.query(queryNoodles_price3, [noodle3_p], (err, data) => {});
    const queryNoodles_price4 = 'UPDATE noodles_type SET price=? WHERE id=4';
    database.query(queryNoodles_price4, [noodle4_p], (err, data) => {});
    const queryNoodles_price5 = 'UPDATE noodles_type SET price=? WHERE id=5';
    database.query(queryNoodles_price5, [noodle5_p], (err, data) => {});

    const queryMeat_price1 = 'UPDATE meat_type SET price=? WHERE id=1';
    database.query(queryMeat_price1, [meat1_p], (err, data) => {});
    const queryMeat_price2 = 'UPDATE meat_type SET price=? WHERE id=2';
    database.query(queryMeat_price2, [meat2_p], (err, data) => {});

    const queryVeg_price1 = 'UPDATE veg_list SET price=? WHERE id=1';
    database.query(queryMeat_price1, [veg1_p], (err, data) => {});
    const queryVeg_price2 = 'UPDATE veg_list SET price=? WHERE id=2';
    database.query(queryMeat_price2, [veg2_p], (err, data) => {});

    const queryTopping_price1 = 'UPDATE topping_list SET price=? WHERE id=1';
    database.query(queryTopping_price1, [topping1], (err, data) => {});
    const queryTopping_price2 = 'UPDATE topping_list SET price=? WHERE id=2';
    database.query(queryTopping_price2, [topping2], (err, data) => {});
    const queryTopping_price3 = 'UPDATE topping_list SET price=? WHERE id=3';
    database.query(queryTopping_price3, [topping1], (err, data) => {});
    const queryTopping_price4 = 'UPDATE topping_list SET price=? WHERE id=4';
    database.query(queryTopping_price4, [topping2], (err, data) => {});

    res.redirect('ingredient');
}); 

module.exports = router;