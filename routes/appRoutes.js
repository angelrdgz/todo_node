'use strict';
module.exports = function(app) {
  var task = require('../controllers/taskController');
  var user = require('../controllers/userController');

  // task Routes
  app.route('/tasks')
    .get(task.list_all_tasks)
    .post(task.create_a_task);

   app.route('/tasks/:taskId')
    .get(task.read_a_task)
    .put(task.update_a_task)
    .delete(task.delete_a_task);

    app.route('/users')
      .post(user.create_a_user);

     app.route('/users/:userId')
      .get(user.read_a_user);
      //.delete(user.delete_a_user);
  };
