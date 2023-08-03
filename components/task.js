import Button from "./button.js";
import TaskData from "../app.state.js";

export default function Task({title, status, onRemove, onMark}){
    var task = document.createElement('li');

    const space = document.createTextNode(" ")

    var taskDiv = document.createElement("div");
    var taskText = document.createTextNode(title);
    taskDiv.append(taskText);

    if(status === 'done'){
        taskDiv.style.textDecoration = "line-through";
    }

    var removeButton = Button({ label:"&times;", onClick:()=>{
        // TaskData.removeTask( task.parentElement.indexOf(task) );
        task.remove();
        onRemove();
    }});
    
    var doneButton = Button({ label:"&check;", onClick:(e)=>{
        taskDiv.style.textDecoration = "line-through";
        e.target.disabled = true;
        onMark();
    }});

    task.append(taskDiv, space, space, doneButton, space, removeButton);
    return task;
}