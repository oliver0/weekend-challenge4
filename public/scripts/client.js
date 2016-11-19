$(document).ready(function(){
  // listener for add button. When clicked addTask function is run, using the task in input field as parameter
  $('#add').on('click', function(){
    var userTask = $('#task').val();
    addTask(userTask);
  });

  // takes in task as a parameter. Makes task object with task_name and complete properties. Makes ajax post to
  // tasks.routes, sending task object as data.
  function addTask(userTask){
    var task = {};
    task.task_name = userTask;
    task.complete = "No";
    console.log(task);
  }


});
