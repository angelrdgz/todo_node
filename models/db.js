'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'learnit',
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
