const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let spacesArray = ["", "", "", "", "", "", ""];

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static('public'));

app.use(session({
  secret: 'tROi$ e+ D3uX Et 1',
  resave: false,
  saveUninitialized: true
}));


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set ('view engine', 'mustache');

app.get('/', function(req, res) {
  res.render("index");
});

// Receives data from form (action='/')
// 'req.body' now contains form data.
app.post('/', function(req, res){
  var guessBox = req.body.guessBox;
  var html = '<p>You guessed: </p>' + guessBox;
  res.render("index");
});

app.listen(3000, function() {
  console.log("Working hard... Listening on 3000");
});