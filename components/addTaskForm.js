'use strict';

import { TaskItem } from "../app.state.js";
import Button from "./button.js";
// import Container from "./container.js";

export default function AddTaskForm({onAdd}){

    const form = document.createElement('form');
    const taskInput = document.createElement('input');
    const taskInputAttributes = {
        type: 'text',
        placeholder: 'Enter task title',
        name:"task",
        required: "required"
    }
    Object.keys(taskInputAttributes).forEach(attr=>taskInput[attr]=taskInputAttributes[attr]);

    const addTaskButton = Button({label:"Submit Task", type: "submit"});

    form.addEventListener('submit', e=>{
        e.preventDefault();
        onAdd(new TaskItem(taskInput.value, 'not-done'));
        form.reset();
        task = undefined;

    });
    form.append(taskInput, addTaskButton);

    return form;
}