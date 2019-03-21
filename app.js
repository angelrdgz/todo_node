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
    password: 'root',
    database: 'learnit',
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/approutes'); //importing route
routes(app); //register the route
