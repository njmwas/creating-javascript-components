
var tasks = getTasks();

export function TaskItem(title, status="done"){
    this.title = title;
    this.status = status;
}

function getTasks(){
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function addTask(task){
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(index){
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function markAs(index, status='done'){
    tasks[index].status = status;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default {
    tasks,
    addTask,
    removeTask,
    markAs
}