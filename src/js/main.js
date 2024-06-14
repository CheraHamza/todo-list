import { initLoad, renderTasks } from './dom.js'
import { saveTasks, loadTasks } from './localstorage.js'

loadTasks();

window.addEventListener('beforeunload', () => {
    saveTasks();
});

initLoad();

renderTasks();