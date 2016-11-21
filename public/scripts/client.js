
var tasksObjects = [];
$(document).ready(function(){
  getTasks();

  // listener for add button. When clicked addTask function is run, using the task in input field as parameter
  $('#add').on('click', function(){

    var userTask = $('#task').val();
    $('#task').val('');
    addTask(userTask);
    console.log('clicked');
  });

  $('#taskBox').on('click', '.checkbox', function(){
    var id = $(this).parent().data('id');
    var taskComplete = $(this).attr('class').split(' ')[1];
    updateTaskCompletion (taskComplete, id);

    // $.ajax({
    //   type: 'GET',
    //   url: '/tasks/' + id,
    //   // tasks paramater contains all of the table rows as an array of objects
    //   success: function(tasks){
    //     console.log('get tasks successful!');
    //     taskComplete = tasks[0].complete;
    //     updateTaskCompletion (taskComplete, id);
    //
    //
    //   },
    //   error: function(){
    //     console.log('could not get tasks');
    //   }
    // });
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
    console.log('addTask');
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
    console.log('getTasks');
    $.ajax({
      type: 'GET',
      url: '/tasks',
      // tasks paramater contains all of the table rows as an array of objects
      success: function(tasks){
        tasksObjects = tasks;
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
    console.log(deleteTask);

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
  function updateTaskCompletion (completeText, id){


    var isComplete = {};
    if (completeText=='No') {
      isComplete.complete = 'Yes';
    }
    if (completeText=='Yes'){
      isComplete.complete = 'No';
    }

    $.ajax({
      type: 'PUT',
      url: '/tasks/' + id,
      data: isComplete,
      success: function(response){
        console.log('Put succesful!')
        getTasks();
      },
      error: function(response){
        console.log('Put not succesful');
      }
    });
  }


  // this takes in the array of row objects from tasks table and appends a div with the task name, a delete
  // button and a checkbox div.
  function appendTasks(tasks){
    console.log('appendTasks');
    var $taskBox = $('#taskBox');
    $taskBox.empty();

    for (var i = 0; i < tasks.length; i++) {
      console.log(tasks.length);
      $taskBox.append('<div class="task"></div>');
      var task = $taskBox.children().last();
      console.log('task complete: ', tasks[i].complete)
      // if (tasks[i].complete == 'Yes') {
      //   task.append('<div class="checkbox complete"></div>');
      // } else{
      //   task.append('<div class="checkbox incomplete "></div>');
      // }
      task.append('<div class="checkbox '+ tasks[i].complete+ '"></div>');
      task.append('<p>'+ tasks[i].task_name+ '</p>');
      task.append('<button class="delete">Delete</button>');
      task.data('id', tasks[i].id);
      // $taskBox.append('<div class="task"><div class="checkbox"></div><p>'+
      //                   tasks[i].task_name+'</p><button class="delete">Delete</button>'+
      //                   '<div>');
      // $taskBox.children().last().data('id', tasks[i].id);
    }
  }


});
