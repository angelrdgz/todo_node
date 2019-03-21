'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    this.user_id = task.user_id;
    this.title = task.title;
    this.description = task.description;
    this.completed = task.completed;
    this.created_at = new Date();
    this.updated_at = new Date();
};
Task.createTask = function createUser(newTask, result) {
        sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res.insertId);
                }
            });
};
Task.getTaskById = function createUser(taskId, result) {
        sql.query("Select * from tasks where id = ? ", taskId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Task.getAllUserTask = function getAllUserTask(userId, result) {
        sql.query("Select * from tasks where user_id = ?", userId, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);

                 result(null, res);
                }
            });
};
Task.getAllTask = function getAllTask(result) {
        sql.query("Select * from tasks", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);

                 result(null, res);
                }
            });
};
Task.updateById = function(id, task, result){
  sql.query("UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ?", [task.title, task.description, task.completed, new Date(), id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Task.remove = function(id, result){
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

module.exports= Task;
