'use strict';

var User = require('../models/user.js');

exports.list_all_users = function(req, res) {
  User.getAllUsers(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};

exports.read_a_user = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  //handles nul
  if(!new_user.name || !new_user.last){
    res.status(400).send({ error:true, message: 'Please provide task/status' });
  }else{
    User.createUser(new_user, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }
};
