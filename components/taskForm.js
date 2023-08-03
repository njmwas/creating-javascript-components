'use strict';

import { TaskItem } from "../app.state.js";
import Button from "./button.js";
import Container from "./container.js";
// import Container from "./container.js";

export function formInput(attr){
    const input = document.createElement('input');
    Object.keys(attr).forEach(attrKey=>input[attrKey]=attr[attrKey]);
    return input;
}

export default function TaskForm({onAdd, defultTask}){

    const form = document.createElement('form');
    form.classList.add('task-form');

    const titleLabel = document.createElement('label');
    titleLabel.innerText = 'Title';
    const titleInput = formInput({
        type: 'text',
        placeholder: 'Enter task title',
        name:"task",
        required: "required",
        value: defultTask ? defultTask.title : ""
    });

    const addTaskButton = Button({label:"Submit Task", type: "submit"});

    form.addEventListener('submit', e=>{
        e.preventDefault();
        let task;
        if(defultTask){
            task = {
                ...defultTask,
                title: titleInput.value,
                status: 'edited'
            };
        }
        else task = new TaskItem(titleInput.value, 'not-done');
        
        onAdd(task);
        form.reset();

    });
    form.append(Container(titleLabel, titleInput), addTaskButton);

    return form;
}