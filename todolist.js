import AddTaskForm from "./components/addTaskForm.js";
import Button from "./components/button.js";
import Container from "./components/container.js";
import Task from "./components/task.js";
import TaskList from "./components/tasks.js";

var toDoApp = document.querySelector('#todoapp');

var taskLIst = TaskList();
var addTaskForm = AddTaskForm({
    onAdd:(taskItem)=>{
        const task = Task({
            title: taskItem
        });
    
        taskLIst.append(task);
    }
});

var actionSection = Container(addTaskForm);

toDoApp.append(actionSection, taskLIst);
