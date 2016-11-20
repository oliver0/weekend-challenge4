$(document).ready(function(){
  getTasks();
  // listener for add button. When clicked addTask function is run, using the task in input field as parameter
  $('#add').on('click', function(){

    var userTask = $('#task').val();
    $('#task').val('');
    addTask(userTask);
  });

  $('#taskBox').on('click', '.checkbox', function(){
    console.log('clicked');
    $(this).css('background-color', '#444444');
  });

  // listens for delete button click. Makes function call to delete task from database then appends
  // updated table to DOM (inside deleteTask function it calls getTasks)
  $('#taskBox').on('click', '.delete', function(){
    var id = $(this).parent().data('id');
    deleteTask(id);
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
      // tasks paramater contains all of the table rows as an array of objects
      success: function(tasks){
        console.log('get tasks successful!');
        appendTasks(tasks);
        console.log(tasks);
      },
      error: function(){
        console.log('could not get tasks');
      }
    });
  }

  // makes ajax call to tasks.js which queries the tasks table and deletes the task that matches
  // the id given as a parameter. if successful getTasks is called
  function deleteTask(id){

    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + id,
      success: function(response){
        console.log('delete successful!');
        getTasks();
      },
      error: function(){
        console.log('could not delete');
      }

    });
  }

  // Make a PUT request to the tasks.js route
  function updateTaskCompletion (complete){

    $.ajax({
      type: 'PUT',
      url: '/tasks',
    });
  }


  // this takes in the array of row objects from tasks table and appends a div with the task name, a delete
  // button and a checkbox div.
  function appendTasks(tasks){
    var $taskBox = $('#taskBox');
    $taskBox.empty();

    for (var i = 0; i < tasks.length; i++) {
      $taskBox.append('<div class="task"><div class="checkbox"></div><p>'+
                        tasks[i].task_name+'</p><button class="delete">Delete</button>'+
                        '<div>');
      $taskBox.children().last().data('id', tasks[i].id);
    }
  }


});
