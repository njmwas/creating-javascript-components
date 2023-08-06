'use strict'

import TaskForm from "./components/taskForm.js";
import Button from "./components/button.js";
import Container from "./components/container.js";
import Task from "./components/task.js";
import TaskList from "./components/tasks.js";
import TaskData, { TaskItem } from "./app.state.js";
import Dialog from "./components/dialog.js";

var toDoApp = document.querySelector('#todoapp');

function openTaskForm(task) {

    var dialogTitle = document.createElement('h4');
    dialogTitle.innerText = `${task ? 'Edit' : 'Add'} Task`;
    var closeDialogButton = Button({label:"&times;", onClick:()=>dialog.close()});

    var addTaskForm = TaskForm({
        onAdd: (taskItem) => {

            let taskIndex = TaskData.tasks.findIndex(tsk=>tsk.id == taskItem.id);
            if(taskIndex == -1) taskIndex = TaskData.tasks.length;

            const taskListItem = Task({
                task:taskItem,
                onRemove: () => TaskData.removeTask(taskIndex),
                onMark: () => TaskData.markAs(TaskData.tasks.findIndex(tsk=>tsk.id == taskItem.id)),
                onEdit: () => openTaskForm(TaskData.tasks.find(tsk=>tsk.id == taskItem.id))
            });

            if (taskItem.status === 'edited') {
                TaskData.editTask(taskIndex, { ...taskItem, status: 'not-done' });
                taskLIst.replaceChild(taskListItem, taskLIst.childNodes.item(taskIndex));
                // taskLIst.childNodes.item(taskIndex).querySelector('div').innerHTML = taskItem.title;
            }
            else {
                TaskData.addTask(taskItem);
                taskLIst.append(taskListItem);
            }

            dialog.close();
        },
        defultTask: task
    });

    var dialogHeader = Container(dialogTitle, Container(closeDialogButton));
    dialogHeader.classList.add('dialog-header');

    const dialog = Dialog(dialogHeader, addTaskForm);
    toDoApp.append(dialog);
    dialog.showModal();
}

var taskLIst = TaskList(TaskData.tasks.map((tsk, i) => Task({
    task:tsk,
    onRemove: () => TaskData.removeTask(i),
    onMark: () => TaskData.markAs(i),
    onEdit: () => openTaskForm(tsk)
})));

var actionSection = Container(Button({
    label: "Add Task", 
    onClick: ()=>openTaskForm()
}));

toDoApp.append(actionSection, Container(taskLIst));
