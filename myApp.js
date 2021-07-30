var express = require('express');
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser');

console.log("Hello World");

// logger middleware
const simpleLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}
app.use(simpleLogger);

// First task
// app.get('/', (req, res) => {res.send("Hello Express")});

app.get('/', (req, res) => {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

// Midelware Normal Usage, middleware will be executed for all requests.
// app.use(express.static(__dirname + '/public'));

// Midelware mounted to the path '/public'
app.use('/public', express.static(__dirname + '/public'));

// Serving a JSON 1
// app.get('/json', (req, res) => {
//   res.json({"message": "Hello json"});
// });

// Serving a JSON 2
app.get('/json', (req, res) => {
  let response = "Hello json";
//   console.log("MS: " + process.env.MESSAGE_STYLE)
  if (process.env.MESSAGE_STYLE == "uppercase") {
    response = response.toUpperCase();
  }    
  res.json({"message": response});
});

// endpoint with middleware that adds date to a req object
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
},function (req, res) {
  res.send({"time": req.time});
});

// echo server
app.get('/:word/echo', (req, res) => {
    res.json({"echo": req.params.word});
});

// midelware for parsing the params in the POST request below
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// get query parameters
app.route('/name').get((req, res) => {
  const {first, last} = req.query
  res.send({"name": `${first} ${last}`});
}).post((req, res) => {
  res.send({"name": `${req.body.first} ${req.body.last}`});
});







































 module.exports = app;
