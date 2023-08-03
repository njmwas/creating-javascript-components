
var tasks = getTasks();

export function TaskItem(title, status="done", id){
    this.title = title;
    this.status = status;
    this.id = id || Math.random().toString(32).split(".").pop()
}

function getTasks(){
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function addTask(task){
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(index, task){
    tasks.splice(index, 1, task);
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

function findTaskBYId(id){
    const index = tasks.findIndex(tsk=>tsk.id == id);
    return index != -1 ? { index, task: tasks[index] } : null;
}

export default {
    tasks,
    addTask,
    removeTask,
    markAs,
    findTaskBYId,
    editTask
}