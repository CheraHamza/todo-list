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


function initLoad() {
    sideIconLaod();
}


initLoad();