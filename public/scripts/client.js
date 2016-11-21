
$(document).ready(function(){
  getTasks();

  // listener for add button. When clicked addTask function is run, using the task in input field as parameter
  $('#add').on('click', function(){

    var userTask = $('#task').val();
    // if there's no input when add is clicked the user is alerted and nothing else happens
    if(userTask != ''){
      $('#task').val('');
      addTask(userTask);
    } else {
      alert("You haven't entered anything yet!");
    }

  });

  // when checkbox is clicked get the id and the complete status from the task and the checkbox respectively.
  // call the updateTaskCompletion function which updates status and calls getTasks();
  $('#taskBox').on('click', '.checkbox', function(){
    var id = $(this).parent().data('id');
    var taskComplete = $(this).attr('class').split(' ')[1];
    updateTaskCompletion(taskComplete, id);
  });

  // listens for delete button click. Makes function call to delete task from database then appends
  // updated table to DOM (inside deleteTask function it calls getTasks)
  $('#taskBox').on('click', '.delete', function(){
    var id = $(this).parent().data('id');
    if(confirm('Are you sure you want to delete this task?')){
      deleteTask(id);
    }
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

  // Make a PUT request to the tasks.js route which will make a query to update the complete status of task
  function updateTaskCompletion (completeText, id){
    //change complete status to the opposite and insert into object

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
      $taskBox.append('<div class="task"></div>'); // append task div first then append contents to task
      var task = $taskBox.children().last();

      // use the complete status of task as the second class of checkbox, which determines color
      task.append('<div class="checkbox '+ tasks[i].complete+ '"></div>');
      task.append('<button class="delete">x</button>');
      task.append('<p>'+ tasks[i].task_name+ '</p>');
      var $taskName = task.find('p');
      if (tasks[i].complete == 'Yes') {
        $taskName.css('text-decoration', 'line-through');
      }
      task.data('id', tasks[i].id); // give tasks id so they can be easily found

    }
  }


});
