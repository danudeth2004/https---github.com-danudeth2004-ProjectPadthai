var express = require('express');
var router = express.Router();

router.get('/order', function(req, res, next) {
    res.render('en/order', { title: 'OrderEN' });
});

router.get('/order/cart', function(req, res, next) {
    res.render('en/cart', { title: 'CartEN' });
});

module.exports = router;
