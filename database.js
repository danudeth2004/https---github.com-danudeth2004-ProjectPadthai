const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    database : 'padthaiv3',
    user : 'root',
    password : '',
    port : '3307'
});

connection.connect(function(err){
    if (err){
        throw err;
    }
    else console.log('MySQL is connected successfully.');
});

module.exports = connection;
