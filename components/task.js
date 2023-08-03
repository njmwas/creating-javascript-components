import Button from "./button.js";
import TaskData from "../app.state.js";

export default function taskItem({task, onRemove, onMark, onEdit}){
    var taskItem = document.createElement('li');
    taskItem.id = task.id;

    var taskDiv = document.createElement("div");
    var taskText = document.createTextNode(task.title);
    taskDiv.append(taskText);

    var removeButton = Button({ label:"&times;", onClick:()=>{
        taskItem.remove();
        onRemove();
    }});
    
    var doneButton = Button({ label:"&check;", onClick:(e)=>{
        taskDiv.style.textDecoration = "line-through";
        e.target.disabled = true;
        onMark();
    }});

    var editButton = Button({label:"&#9998;", onClick:onEdit});

    if(task.status === 'done'){
        taskDiv.style.textDecoration = "line-through";
        doneButton.disabled = true;
    }

    taskItem.append(taskDiv, doneButton, editButton, removeButton);
    return taskItem;
}