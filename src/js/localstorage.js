import logic from './taskController.js'
import Task from './task.js';

function saveTasks(){
    let tasks = logic.Tasks;
    let serializedTasks = [];
    tasks.forEach(task => {
        serializedTasks.push(JSON.stringify({
            __type__: 'Task',
            data: {
                id: task.id,
                parentList: task.parentList,
                name: task.name,
                date: task.date,
                description: task.description,
                checklist: task.checklist,
                status: task.status,
                deleted: task.deleted,
                wontdo: task.wontdo
            }
        }));

    });
    localStorage.setItem('Tasks', JSON.stringify(serializedTasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem('Tasks'));
    if(tasks){
        tasks = tasks.map(task => {
            let taskObj = JSON.parse(task);
            let newTask = new Task(taskObj.data.parentList, taskObj.data.name, taskObj.data.date, taskObj.data.description, taskObj.data.status);
            newTask.id = taskObj.data.id;
            newTask.checklist = taskObj.data.checklist;
            newTask.deleted = taskObj.data.deleted;
            newTask.wontdo = taskObj.data.wontdo;
            return newTask;
        });
        logic.Tasks = tasks;
    }
}

export { saveTasks, loadTasks }




