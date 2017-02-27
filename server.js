var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var mysql = require('mysql');
var express = require('express');
var app = express();
var router = express.Router(['caseSensitive'])
var config = require('./webpack.config')
var bodyParser = require('body-parser')

var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

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

function getUrl() {
    return '/list/*';
}

app.post(getUrl(), function(req, resp, next) {
    console.log('req.body', req.body.text)
    var text = req.body.text;
    connection.query(
        'SELECT * FROM ' + text, 
        function(errors, rows, fields) {
            if(!!errors) {
                console.log('error in the query', errors);
            } else {
                console.log('sucess\n');
                resp.send(rows);
            }
        }
    )
})

app.get(getUrl(), function(req, resp, next) {
    console.log('req.query.ur', req.query.url)
    connection.query(
        'SELECT `id`, `user_id`, `url`, `public` FROM `list` WHERE `url` = \'new_list\'', 
        function(errors, rows, fields) {
            if(!!errors) {
                console.log('error in the query', errors);
            } else {
                console.log('sucess\n');
                resp.send(rows);
            }
        }
    )
})

// var getList = function( req, resp, next) {
//     // console.log('req.body', req.body.text)
//     // var text = req.body.text;
//     connection.query(
//         'SELECT * FROM `items`', 
//         function(errors, rows, fields) {
//             if(!!errors) {
//                 console.log('error in the query', errors);
//             } else {
//                 console.log('sucess\n');
//                 resp.send(rows);
//             }
//         }
//     )
// };

// router.all('*', function( req, resp, next) {
//     // console.log('req.body', req.body.text)
//     // var text = req.body.text;
//     connection.query(
//         'SELECT * FROM `items`', 
//         function(errors, rows, fields) {
//             if(!!errors) {
//                 console.log('error in the query', errors);
//             } else {
//                 console.log('sucess\n');
//                 resp.send(rows);
//             }
//         }
//     )
// });

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
