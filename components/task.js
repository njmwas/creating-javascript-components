import Button from "./button.js";

export default function Task({title}){
    var task = document.createElement('li');

    const space = document.createTextNode(" ")

    var taskSpan = document.createElement("span");
    var taskText = document.createTextNode(title);
    taskSpan.append(taskText);

    var removeButton = Button({ label:"&times;", onClick:()=>task.remove()});
    
    var doneButton = Button({ label:"&check;", onClick:(e)=>{
        taskSpan.style.textDecoration = "line-through";
        e.target.disabled = true;
    }});

    task.append(...[taskSpan, space, space, doneButton, space, removeButton]);
    return task;
}