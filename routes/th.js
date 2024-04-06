var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res, next) {
  res.render('th/', { title: 'OrderTH' });
});

router.get("/order", (req, res, next) => {

  const noodles_query = "SELECT noodles_nameTH,price FROM noodles_type;";
  const meat_query = "SELECT meat_nameTH,price FROM meat_type;";
  const topping_query = "SELECT topping_nameTH,price FROM topping_list;";
  const veg_query = "SELECT veg_nameTH,price FROM veg_list;";

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

                  res.render("th/order", 
                  {title: "OrderTH",
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
    var noodles_type_tempTH = req.body.noodlesTH;
    var meat_type_tempTH = req.body.meatTH;

    var add_veg_tempTH = req.body.vegTH;
    var veg_tempTH =  "";

    var add_topping_tempTH = req.body.topTH;
    var topping_tempTH = "";

    if(add_veg_tempTH === undefined){
        veg_tempTH = "None";
    }
    else if(add_veg_tempTH.length>2){
        for (let i = 0; i < add_veg_tempTH.length; i++) {
            veg_tempTH += add_veg_tempTH[i];
        }
    }
    else{
        for (let i = 0; i < add_veg_tempTH.length; i++) {
            if(i<add_veg_tempTH.length-1){
                veg_tempTH += add_veg_tempTH[i]+", ";
            }
            else{
                veg_tempTH += add_veg_tempTH[i];
            }
        }
    }

    if(add_topping_tempTH === undefined){
        topping_tempTH = "None";
    }
    else if(add_topping_tempTH.length>4){
        for (let i = 0; i < add_veg_tempTH.length; i++) {
            topping_tempTH += add_topping_tempTH[i];
        }
    }
    else{
        for (let i = 0; i < add_topping_tempTH.length; i++) {
            if(i<add_topping_tempTH.length-1){
                topping_tempTH += add_topping_tempTH[i]+", ";
            }
            else{
                topping_tempTH += add_topping_tempTH[i];
            }
        }
    }

    const orderDetails = req.body;
    if(!req.session.item){
        req.session.item = [];
    }
    req.session.item.push(orderDetails);

    res.redirect('order');
    
    const queryString_detail = 'INSERT INTO order_detail (noodles_nameTH, meat_nameTH, topping_nameTH, veg_nameTH) VALUES (?, ?, ?, ?)';
    database.query(queryString_detail, [noodles_type_tempTH, meat_type_tempTH, topping_tempTH, veg_tempTH],(err, data) => {
    if(err){
        console.error(err);
    }
    else console.log("Query Successfully.");

    });
    res.redirect('order');
});

router.get('/order/cart', function(req, res, next) {
    const items = req.session.item || [];
    res.render("th/cart",
                {title: "CartTH",
                items: items
    });
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

router.get('/order/cart/end', function(req, res, next) {
    const items = req.session.item || [];
    res.render("th/end",
                {title: "EndEN",
                items: items
    });
    //res.send(items);
});

module.exports = router;
