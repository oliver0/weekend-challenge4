var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/todo_list';
console.log('Made it to tasks.js');
router.post('/', function(req, res){
  console.log('REQ: ', req.body);
  res.sendStatus(201);
});

module.exports = router;
