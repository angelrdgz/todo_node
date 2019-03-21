'user strict';
const bcrypt = require('bcrypt');
var sql = require('./db.js');

//User object constructor
var User = function(user){
    this.user_id = user.user_id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.created_at = new Date();
};

User.loginUser = function loginUser(user, result){
  sql.query("select * from users where email = ? ", user.email, function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(err, null);
    }
    else{
          bcrypt.compare(user.password, res[0].password, function (err, ans) {
            if (ans == true) {
              result(null, res[0]);
          } else {
              result(err, null);
          }

      })
    }
  })
}


User.createUser = function createUser(newUser, result) {

     var userData = {
       name: newUser.name,
       email: newUser.email,
       password: newUser.password,
       created_at: new Date(),
       updated_at: new Date()
    }

    var user = userData;

    bcrypt.hash(user.password, 10, function(err, hash){
         if(err) console.log(err);
         user.password = hash;
         sql.query("insert into users set ?",
            user, function(err,res){ //saves non-hashed password
              if(err) {
                  console.log("error: ", err);
                  result(err, null);
              }
              else{
                  console.log(res.insertId);
                  result(null, res.insertId);
              }
        });
    });

        /*sql.query("INSERT INTO users set ?", newUser, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });*/
};
User.getUserById = function createUser(userId, result) {
        sql.query("Select * from users where id = ? ", userId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
User.getAllUsers = function getAllUsers(result) {
        sql.query("Select * from users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('user : ', res);

                 result(null, res);
                }
            });
};

User.updateById = function(id, user, result){
  sql.query("UPDATE users SET user = ? WHERE id = ?", [user.name, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
User.remove = function(id, result){
     sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= User;
