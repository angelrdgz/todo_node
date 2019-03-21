const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  var cors = require('cors')
  port = process.env.PORT || 3000;

  app.use(cors());

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learnit',
});

// connect to database
mc.connect();

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/routes'); //importing route
routes(app); //register the route

app.listen(port);
