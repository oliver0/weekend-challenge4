var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/todo_list';

router.get('/', function(req,res){
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM tasks ORDER BY complete ASC;', function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });

  });
});

router.get('/:id', function(req, res) {
  console.log('completion get working!');
  taskID = req.params.id;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM tasks WHERE id = $1',
      [taskID],
      function(err, result) {
        done();
        console.log(result.rows);

        if(err) {
          console.log('select query error: ', err);
          res.sendStatus(500);
        }
        res.send(result.rows);

    });

  });
});

router.post('/', function(req, res){
  var task = req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO tasks (task_name, complete) ' +
      'VALUES ($1, $2)',
      [task.task_name, task.complete],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });
});

router.delete('/:id', function(req, res) {
  taskID = req.params.id;

  console.log('task id to delete: ', taskID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM tasks WHERE id = $1',
      [taskID],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

router.put('/:id', function(req, res) {
  taskID = req.params.id;
  isComplete = req.body;

  console.log('task completion ', isComplete.complete);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'UPDATE tasks SET complete=$1 WHERE id=$2',
      [isComplete.complete, taskID],
      function(err, result) {
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

module.exports = router;
