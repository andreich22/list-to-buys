var express = require('express');
var mysql = require('mysql');
 
var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list-to-buys-BD'
})

connection.connect(function(error){
    if(!!error) {
        console.log('error');
    } else {
        console.log('Connected s');
    }
})

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/gte-item', function(req, resp, next) {
    connection.query(
        'SELECT * FROM items', 
        function(errors, rows, fields) {
            if(!!errors) {
                console.log('error in the query');
            } else {
                console.log('sucess\n');
                console.log(rows);
                resp.send(rows);
            }
        }
    )
})

app.listen(3001);