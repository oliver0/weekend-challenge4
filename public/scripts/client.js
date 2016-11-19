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

    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: task,
      success: function(response){
        console.log('task post successful!!');
        getTasks();

      },
      error: function(){
        console.log('could not post task');
      }
    });
  }

  // Makes an ajax get request to the tasks.js route. Gets all of the current tasks
  function getTasks(){

    $.ajax({
      type: 'GET',
      url: '/tasks',
      success: function(tasks){
        console.log('get tasks successful!');
        console.log(tasks);
      },
      error: function(){
        console.log('could not get tasks');
      }
    });
  }


});
