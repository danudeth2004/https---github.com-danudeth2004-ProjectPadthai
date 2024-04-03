var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res, next) {
  res.render('th/', { title: 'OrderTH' });
});

router.get("/order", (req, res, next) => {

  const noodles_query = "SELECT noodles_nameTH FROM noodles_type_th;";
  const meat_query = "SELECT meat_nameTH FROM meat_type_th;";
  const topping_query = "SELECT topping_nameTH FROM topping_list_th;";
  const veg_query = "SELECT veg_nameTH FROM veg_list_th;";

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

module.exports = router;
