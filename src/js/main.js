import '../css/main.css'
import allIcon from '../assets/icons/all.svg'
import todayIcon from '../assets/icons/today.svg'
import tomorrowIcon from '../assets/icons/tomorrow.svg'
import inboxIcon from '../assets/icons/inbox.svg'
import personalIcon from '../assets/icons/personal.svg'
import workIcon from '../assets/icons/work.svg'
import fitnessIcon from '../assets/icons/fitness.svg'
import learningIcon from '../assets/icons/learning.svg'
import completedIcon from '../assets/icons/completed.svg'
import wontDoIcon from '../assets/icons/wont-do.svg'
import trashIcon from '../assets/icons/trash.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import checklistIcon from '../assets/icons/checklist.svg'
import selectTaskIllustration from '../assets/icons/select-task.svg'
import { add } from 'date-fns'


function sideIconLaod() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarItems = sidebar.getElementsByTagName('button');
    const icons = {
        all: allIcon,
        today: todayIcon,
        tomorrow: tomorrowIcon,
        inbox: inboxIcon,
        personal: personalIcon,
        work: workIcon,
        fitness: fitnessIcon,
        learning: learningIcon,
        completed: completedIcon,
        wontDo: wontDoIcon,
        trash: trashIcon,
    }

    for(let i = 0; i < sidebarItems.length; i++) {
        const btnIcon = document.createElement('img');
        btnIcon.src = icons[Object.keys(icons)[i]];
        sidebarItems[i].prepend(btnIcon);
    }
}

function addTask(){
    const addTaskBar = document.querySelector('.add-task-bar');
    const calendar = document.createElement('img');
    calendar.classList.add('calendar-icon');
    calendar.src = calendarIcon;
    addTaskBar.appendChild(calendar);
}

function addChecklist(){
    const taskHeader = document.querySelector('.task-header');
    const checklist = document.createElement('img');
    checklist.classList.add('checklist-icon');
    checklist.src = checklistIcon;
    taskHeader.appendChild(checklist)
}

function addDeleteAction(){
    const taskActions = document.querySelector('.task-actions');
    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.src = trashIcon;
    taskActions.appendChild(deleteIcon);
}

function addSelectIllustation(){
    const taskDetails = document.querySelector('.task-details');
    const selectTask = document.createElement('img');
    const caption = document.createElement('p');

    caption.classList.add('select-task-caption');
    caption.textContent = 'Select a task to see details';

    selectTask.classList.add('select-task-illustration');
    selectTask.src = selectTaskIllustration;

    taskDetails.appendChild(selectTask);
    taskDetails.appendChild(caption);
}

function initLoad() {
    sideIconLaod();
    addTask();
    // addSelectIllustation();
    addChecklist();
    addDeleteAction();
}


initLoad();


