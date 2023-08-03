export default function TaskList(tasks=[]){
    var unOrderedList = document.createElement('ul');
    unOrderedList.append(tasks);
    return unOrderedList;
}