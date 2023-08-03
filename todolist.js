import AddTaskForm from "./components/addTaskForm.js";
import Button from "./components/button.js";
import Container from "./components/container.js";
import Task from "./components/task.js";
import TaskList from "./components/tasks.js";
import TaskData, { TaskItem } from "./app.state.js";

var toDoApp = document.querySelector('#todoapp');

var taskLIst = TaskList(TaskData.tasks.map((tsk, i)=>Task({
    ...tsk,
    onRemove:()=>TaskData.removeTask(i),
    onMark:()=>TaskData.markAs(i)
})));

var addTaskForm = AddTaskForm({
    onAdd:(taskItem)=>{
        let tasksLength = TaskData.tasks.length;
        const task = Task({
            title: taskItem,
            onRemove: ()=>TaskData.removeTask(tasksLength),
            onMark: ()=>TaskData.markAs(tasksLength)
        });
        
        TaskData.addTask(new TaskItem(taskItem, 'not-done'));
        taskLIst.append(task);
    }
});

var actionSection = Container(addTaskForm);

toDoApp.append(actionSection, Container(taskLIst));
