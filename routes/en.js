var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/order", (req, res, next) => {

    const noodles_query = "SELECT noodles_nameEN,price,status FROM noodles_type;";
    const meat_query = "SELECT meat_nameEN,price,status FROM meat_type;";
    const topping_query = "SELECT topping_nameEN,price,status FROM topping_list;";
    const veg_query = "SELECT veg_nameEN,price,status FROM veg_list;";
  
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

router.post('/order', function (req, res) {
    const orderDetails = req.body;
    if(!req.session.item){
        req.session.item = [];
    }
    req.session.item.push(orderDetails);

    res.redirect('order');
});

router.get('/order/cart', function(req, res, next) {
    const items = req.session.item || [];
    res.render("en/cart",
                {title: "CartEN",
                items: items
    });
    //res.send(items);
});

router.post('/order/cart', function(req, res, next) {
    var indexId = parseInt(req.body.indexId);

    if (!Array.isArray(req.session.item)) {
        req.session.item = [];
    }
    if (indexId < req.session.item.length) {
        req.session.item.splice(indexId, 1);
    } else {
        console.log(indexId);
    }

    res.redirect('cart');
});

router.post('/order/cart/end', function(req, res, next) {
    const items = req.session.item || [];

    /* Order_detail */
    for(var i = 0; i < req.session.item.length; i++){
        var noodles_type_EN = items[i]["noodlesEN"];
        var meat_type_EN = items[i]["meatEN"];
    
        var add_veg_EN = items[i]["vegEN"];
        var veg_EN =  "";
    
        var add_topping_EN = items[i]["topEN"];
        var topping_EN = "";
    
        if(add_veg_EN === undefined){
            veg_EN += "-";
        }
        else if(add_veg_EN.length>2){
            for (let i = 0; i < add_veg_EN.length; i++) {
                veg_EN += add_veg_EN[i];
            }
        }
        else{
            for (let i = 0; i < add_veg_EN.length; i++) {
                if(i<add_veg_EN.length-1){
                    veg_EN += add_veg_EN[i]+", ";
                }
                else{
                    veg_EN += add_veg_EN[i];
                }
            }
        }
    
        if(add_topping_EN === undefined){
            topping_EN += "-";
        }
        else if(add_topping_EN.length>4){
            for (let i = 0; i < add_topping_EN.length; i++) {
                topping_EN += add_topping_EN[i];
            }
        }
        else{
            for (let i = 0; i < add_topping_EN.length; i++) {
                if(i<add_topping_EN.length-1){
                    topping_EN += add_topping_EN[i]+", ";
                }
                else{
                    topping_EN += add_topping_EN[i];
                }
            }
        }
        
        const queryString_detail = 'INSERT INTO order_detail (noodles_nameEN, meat_nameEN, topping_nameEN, veg_nameEN) VALUES (?, ?, ?, ?)';
        database.query(queryString_detail, [noodles_type_EN, meat_type_EN, topping_EN, veg_EN],(err, data) => {
        if(err){
            console.error(err);
        }
        else console.log("Query Successfully.");
    
        });
    }

    /* Customer & Order_income */
    var tel = req.body.customer_tel;
    const queryString_cus = 'INSERT INTO customer (customer_tel) VALUES (?)';
    database.query(queryString_cus, [tel], (err, data) => {
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
            var order_date = items[req.session.item.length-1]["order_date"];
            var order_time = items[req.session.item.length-1]["order_time"];
            var values = cus_id_data.map(item => [item.customer_id]);

            const queryString_income = 'INSERT INTO order_income (order_id, order_date, order_time, customer_id) VALUES (?,?,?,?)'
            database.query(queryString_income, [values, order_date, order_time, values], (err, data) => {
                if (err) {
                    console.error(err);
                }
                else console.log("Query Order Incoming Successfully.");
            });
        };
    });

    /* Payment */
    const queryString_order_id = 'SELECT customer_id FROM customer ORDER BY customer_id DESC LIMIT 1';
    database.query(queryString_order_id, function (err, order_id_data) {
        if (err) {
            console.error(err);
        }
        else {
            var total_price = 0
            for(var i = 0; i < req.session.item.length; i++){
                if((items[i]["price"]) == null){
                    items[i]["price"] = 0;
                }
                total_price += parseInt(items[i]["price"]);
            }

            var values = order_id_data.map(item => [item.customer_id]);

            const queryString_payment = 'INSERT INTO payment (total_price, order_id, status) VALUES (?,?,?)';
            database.query(queryString_payment, [total_price, values, 0], (err, data) => {
                if (err) {
                    console.error(err);
                }
                else console.log("Query Payment Successfully.");
            });
        };
    });

    /* Submit_order */
    for(var i = req.session.item.length-1; i >= 0; i--) {
        const queryString_detailid = 'SELECT MAX(detail_id)-? AS detail_id FROM order_detail';
        database.query(queryString_detailid, [i], (err, detail_id_data) => {
            if (err) {
                console.error(err);
            }
            else {

                var values_detailid = detail_id_data.map(item => [item.detail_id]);

                const queryString_order_id = 'SELECT order_id FROM order_income ORDER BY order_id DESC LIMIT 1';
                database.query(queryString_order_id, function (err, order_id_data) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        var values = order_id_data.map(item => [item.order_id]);
            
                        const queryString_payment = 'INSERT INTO submit_order (order_id, Detail_id,customer_id,serve) VALUES (?,?,?,?)';
                        database.query(queryString_payment, [values, values_detailid, values, 0], (err, data) => {
                            if (err) {
                                console.error(err);
                            }
                            else console.log("Query Submit Successfully.");
                            
                            /* End Session */
                            req.session.destroy(function(err) {
                                if (err) {
                                    console.error('Error destroying session:', err);
                                } else {
                                    console.log('Session destroyed successfully');
                                }
                            });
                        });
                    };
                });
            };
        });
    }
    res.redirect('/');
});

router.get('/order/cart/end', function(req, res, next) {

    const customer_query = "SELECT customer_id FROM customer ORDER BY customer_id DESC LIMIT 1;";
  
    database.query(customer_query, (err, customer_lastest) => {
        if (err) {
            console.error(err);
        }
        else{

            var customer_id = customer_lastest.map(item => [item.customer_id]);

            const items = req.session.item || [];
            res.render("en/end",
                        {title: "EndEN",
                        items: items,
                        customer_id: parseInt(customer_id)+1
            });
            //res.send(items);
        }
    });
});

module.exports = router;