import Button from "./button.js";
// import TaskData from "../app.state.js";
import Container from "./container.js";

export default function taskItem({ task, onRemove, onMark, onEdit }) {
    var taskItem = document.createElement('li');
    taskItem.id = task.id;
    taskItem.classList.add("task");

    var taskDiv = document.createElement("div");
    var taskText = document.createTextNode(task.title);
    taskDiv.append(taskText);

    var removeButton = Button({
        label: "&times;", onClick: () => {
            taskItem.remove();
            onRemove();
        }
    });
    removeButton.title = "Remove Task";

    var doneButton = Button({
        label: "&check;", onClick: (e) => {
            taskDiv.style.textDecoration = "line-through";
            e.target.disabled = true;
            if(startTime) manageTimer(e);
            startStopTaskButton.disabled = true;
            startStopTaskButton.title = "Task Complete";
            onMark();
        }
    });
    doneButton.title = "Mark Task";
    doneButton.classList.add('mark-task-button');

    var editButton = Button({ label: "&#9998;", onClick: onEdit });
    editButton.title = "Edit Task";

    var startStopTaskButton = Button({ label: "&#x23f5;", onClick: manageTimer });
    startStopTaskButton.title = "Start working on task";
    doneButton.classList.add('startstop-task-button');

    if (task.status === 'done') {
        taskDiv.style.textDecoration = "line-through";
        doneButton.disabled = true;
        startStopTaskButton.disabled = true;
    }


    var taskTImerInterval;
    let startTime, now;
    function manageTimer(evt) {

        var btn = evt.target;

        if (taskTImerInterval || (!taskTImerInterval &&  btn.classList.contains('mark-task-button'))) {
            clearInterval(taskTImerInterval);
            taskTImerInterval = undefined;

            if (btn.classList.contains('mark-task-button')) {
                // startStopTaskButton.innerHTML = "&#x23f5;";
                if (confirm("Would you like to mark this task as done?")) {
                    taskDiv.style.textDecoration = "line-through";
                    doneButton.disabled = true;
                    doneButton.innerHTML = "&check;";
                    doneButton.title = "Task Complete";
                    startStopTaskButton.disabled = true;
                    startStopTaskButton.title = "Task Complete";
                    onMark();
                }
            }
            else{
                startStopTaskButton.innerHTML = "&#x23f5;" + calculateTime();
                startStopTaskButton.title = "Continue Task";
            }
        }
        else {

            doneButton.innerHTML = "&#x23f9;";
            doneButton.title = "Complete Task";
            startStopTaskButton.title = "Pause Task";
            if(!now) startStopTaskButton.innerHTML = `&#x23f8; ${calculateTime()}`;
            taskTImerInterval = setInterval(()=>{
                startStopTaskButton.innerHTML = `&#x23f8; ${calculateTime()}`
            }, 1000);
        }
    }

    function calculateTime(){
        if (!startTime) startTime = new Date();
        if(!now) now = new Date();
        now.setSeconds(now.getSeconds() + 1);

        const diff = now.getTime() - startTime.getTime();
        const hrs = Math.floor(diff / (1000 * 60 * 24));
        const min = Math.floor((diff % (1000 * 60 * 24)) / (1000 * 60));
        const sec = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hrs.toString().padStart(2, '0')}`
            + `:${min.toString().padStart(2, '0')}:`
            + `${sec.toString().padStart(2, '0')}`;
    };

    taskItem.append(taskDiv, Container(startStopTaskButton, doneButton, editButton, removeButton));
    return taskItem;
}