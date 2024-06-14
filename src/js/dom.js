import '../css/main.css'
import '../css/sidebar.css'
import '../css/task-details.css'
import '../css/tasks-container.css'
import logic from './taskController'
import Task from './task'
import Subtask from './subtask'
import { constructNow, add, format} from 'date-fns'
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
import willDoIcon from '../assets/icons/will-do.svg'
import trashIcon from '../assets/icons/trash.svg'
import restoreIcon from '../assets/icons/restore.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import checklistIcon from '../assets/icons/checklist.svg'
import selectTaskIllustration from '../assets/icons/select-task.svg'

function sidebarInit(){

    function renderIcons() {
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
    };
    

    renderIcons();
}

function taskCountIndicator(){
    const sidebarBtns = document.querySelectorAll('.sidebar button');
    sidebarBtns.forEach(btn => {
        const buttonText = btn.childNodes[1].textContent;
        const tasks = logic.getTasks(buttonText);
        if(btn.querySelector('.task-count'))
            {
                    btn.removeChild(btn.querySelector('.task-count'));
            }
        if(tasks)
        {
            const taskCount = tasks.length;
            if(taskCount > 0)
            {
                const taskCountIndicator = document.createElement('div');
                taskCountIndicator.classList.add('task-count');
                taskCountIndicator.textContent = taskCount;
                btn.appendChild(taskCountIndicator);
            }
            
        }
    })
}

function taskbarInit(){
    function renderIcon(){
        const addTaskBar = document.querySelector('.add-task-bar');
        const calendar = document.createElement('img');
        calendar.classList.add('calendar-icon');
        calendar.src = calendarIcon;
        calendar.title = 'Add task date';
        addTaskBar.appendChild(calendar);
    }

    function dateInputInit(){
        const calendarIcon = document.querySelector('.calendar-icon');
        const addDate = document.querySelector('.add-task-date');
        
        calendarIcon.addEventListener('click', () => {
            addDate.onfocus();
        });
    }

    renderIcon();
    dateInputInit();
}

function setDefaultDate(){
    const addDate = document.querySelector('.add-task-date');
    const today = format(constructNow(), 'yyyy-MM-dd');
    const tomorrow = format(add(constructNow(),{days: 1,}), 'yyyy-MM-dd');
    
    const sidebarBtns = document.querySelectorAll('.sidebar button');
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(btn.textContent == 'Tomorrow'){
                addDate.value = tomorrow;
            }
            else{
                addDate.value = today;
            }
        });
    });

    window.addEventListener('load', ()=>{
        addDate.value = today;
    })
}

function resetTaskDetails(){

    const taskDetails = document.querySelector('.task-details');
    taskDetails.classList.add('empty');
    if(taskDetails.classList.contains('active')){
        taskDetails.classList.remove('active');
    }
    taskDetails.innerHTML = '';

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

    addSelectIllustation();
}




function renderTaskDetails(){

    function checklistIconRender(){
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

    function addRestoreAction(){
        const taskActions = document.querySelector('.task-actions');
        const restore = document.createElement('img');
        restore.classList.add('restore-icon');
        restore.src = restoreIcon;
        taskActions.appendChild(restore);
    }

    function addWontDoAction(){
        const taskActions = document.querySelector('.task-actions');
        const wontDo = document.createElement('img');
        wontDo.classList.add('wontdo-icon');
        wontDo.src = wontDoIcon;
        taskActions.appendChild(wontDo);
    }

    function addWillDoAction(){
        const taskActions = document.querySelector('.task-actions');
        const willDo = document.createElement('img');
        willDo.classList.add('willdo-icon');
        willDo.src = willDoIcon;
        taskActions.appendChild(willDo);
    }

    function actionsToolTip(){
        const deleteIcon = document.querySelector('.delete-icon');
        const wontdoIcon = document.querySelector('.wontdo-icon');
        const willdoIcon = document.querySelector('.willdo-icon');
        const restoreIcon = document.querySelector('.restore-icon');
        const checklistIcon = document.querySelector('.checklist-icon');

        checklistIcon.title = "Check list";

        if(contextType == 'deleted')
        {
            deleteIcon.title = "Delete Forever";
            restoreIcon.title = "Restore";
        }
        if (contextType == 'wontdo')
        {
            willdoIcon.title = "Reopen";
        }
        if (contextType != 'deleted')
        {
            deleteIcon.title = "Delete";
        }
        if (contextType != 'wontdo' && contextType != 'deleted')
        {
            wontdoIcon.title = "Won't Do";
        }
 
    }

    const context = retrieveContext();
    const contextType = context[0];

    const taskDetails = document.querySelector('.task-details');
    taskDetails.innerHTML = '';
    taskDetails.classList.add('active');
    if(taskDetails.classList.contains('empty')){
        taskDetails.classList.remove('empty');
    }

    const taskDateStatus = document.createElement('div');
    taskDateStatus.classList.add('task-date-status');

    const taskDate = document.createElement('input');
    taskDate.type = 'date';
    taskDate.classList.add('task-date');
    
    taskDate.addEventListener('click',() =>
    {
        taskDate.showPicker();
    })
    

    const taskStatus = document.createElement('input');
    taskStatus.type = 'checkbox';
    taskStatus.classList.add('task-checkbox');

    taskDateStatus.appendChild(taskStatus);
    taskDateStatus.appendChild(taskDate);

    const divider = document.createElement('hr');

    const taskHeaderDescription = document.createElement('div');
    taskHeaderDescription.classList.add('task-header-description');

    const taskHeader = document.createElement('div');
    taskHeader.classList.add('task-header');

    const taskContent = document.createElement('input');
    taskContent.classList.add('task-content');
    taskContent.placeholder = 'What needs doing?';

    taskHeader.appendChild(taskContent);

    const taskDescription = document.createElement('textarea');
    taskDescription.classList.add('task-description');
    taskDescription.placeholder = 'Description';

    const taskChecklist = document.createElement('div');
    taskChecklist.classList.add('task-checklist-container');

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const taskList = document.createElement('select');
    taskList.id = 'list-selection';

    const lists = ['Inbox', 'Personal', 'Work', 'Fitness', 'Learning'];

    lists.forEach(list => {
        const option = document.createElement('option');
        option.value = list;
        option.textContent = list;
        taskList.appendChild(option);
    });

    taskActions.appendChild(taskList);

    taskHeaderDescription.appendChild(taskHeader);
    taskHeaderDescription.appendChild(taskDescription);
    taskHeaderDescription.appendChild(taskChecklist);
    taskHeaderDescription.appendChild(taskActions);


    taskDetails.appendChild(taskDateStatus);
    taskDetails.appendChild(divider);
    taskDetails.appendChild(taskHeaderDescription);

    checklistIconRender();


    if(contextType == 'deleted'){
        addRestoreAction();
    }
    else if(contextType == 'wontdo'){
        addWillDoAction();
    }
    else{
        addWontDoAction();
    }
    addDeleteAction();
    actionsToolTip();
    disableTaskDetailsEdit();
    disableTaskDetailsCheck()
    
    
}

function disableTaskCheck(){
    const contextType = retrieveContext()[0];

    if( contextType == 'wontdo')
    {
        const taskCheckboxes = document.querySelectorAll('.task>.task-checkbox');
        taskCheckboxes.forEach(box => {
            box.disabled = true;
        })
    }
}

function disableTaskDetailsCheck(){
    const contextType = retrieveContext()[0];

    if( contextType == 'wontdo')
        {
            const taskCheckboxes = document.querySelectorAll('.task-date-status>.task-checkbox');
            taskCheckboxes.forEach(box => {
                box.disabled = true;
            })
        }
}

function disableTaskDetailsEdit(){
    const context = retrieveContext();
    const contextType = context[0];

    if(contextType == 'deleted'){
        const unselectableElements = document.querySelectorAll('.task-date-status, .task-header, .task-description, .task-checklist-container, #list-selection')

        unselectableElements.forEach(element => {
            element.classList.toggle('unselectable');
        })
    }
}




export function renderTasks(){
    resetTaskDetails();
    const context = retrieveContext();
    const contextType = context[0];
    const contextValue = context[1];
    const tasksContainer = document.querySelector('.tasks');
    tasksContainer.innerHTML = '';

    
    
    let tasks = "";

    switch (contextType) {
        case 'list' :
            tasks = logic.getTaskByList(contextValue);
            break;
        
        case 'date' :
            const taskDate = format(new Date(contextValue), 'dd MMM yy');
            tasks = logic.getTaskByDate(taskDate);
            break;

        case 'status' :
            tasks = logic.getTaskByStatus(contextValue);
            break;
        
        case 'deleted' :
            tasks = logic.getDeletedTasks();
            break;
        
        case 'wontdo' :
            tasks = logic.getWontDoTasks();
            break;
    
        default:
            tasks = logic.getAllTasks();
            break;
    }
    

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        if(task.status == 'Completed'){
            checkbox.checked = true;
        }

        const taskContent = document.createElement('input');
        taskContent.classList.add('task-content');
        taskContent.placeholder = 'No title';
        taskContent.value = task.name;

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-information');

        const taskDate = document.createElement('div');
        taskDate.classList.add('task-date');
        taskDate.textContent = task.date;


        const taskList = document.createElement('div');
        taskList.classList.add('task-list');
        taskList.textContent = task.parentList;
        
        taskInfo.appendChild(taskList);
        taskInfo.appendChild(taskDate);
        

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskContent);
        taskElement.appendChild(taskInfo);

        tasksContainer.appendChild(taskElement);
    }

    )

    

    checkTask();
    selectTask();
    displayTaskDetails();
    updateTaskDetails();
    updateTaskInfo();
    disableTaskEdit();
    disableTaskCheck();
    taskCountIndicator();
}

function retrieveContext(){
    const activeList = document.querySelector('.active-list-header');

    switch (activeList.textContent) {
        case 'All':
            return ['', '']

        case 'Today':
            const today = format(constructNow(), 'dd MMM yy');
            return ['date', today];

        case 'Tomorrow':
            const tomorrow = format(add(constructNow(),{days: 1,}), 'dd MMM yy');	
            return ['date', tomorrow];

        case 'Inbox':
            return ['list', 'Inbox'];

        case 'Personal':
            return ['list', 'Personal'];

        case 'Work':
            return ['list', 'Work'];

        case 'Fitness':
            return ['list', 'Fitness'];

        case 'Learning':
            return ['list', 'Learning'];

        case 'Completed':
            return ['status', 'Completed'];

        case "Won't do":
            return ['wontdo', "true"];

        case 'Trash':
            return ['deleted', 'true'];
    }

}

function disableTaskEdit(){
    const context = retrieveContext();
    const contextType = context[0];

    if(contextType == 'deleted' )
    {
        const tasks = document.querySelectorAll(".task>.task-content");
        const taskCheckbox = document.querySelectorAll('.task>.task-checkbox');

        tasks.forEach(task => {
            task.readOnly = 'readonly';
        })
        taskCheckbox.forEach(checkbox => {
            checkbox.disabled = true;
        });
    }

}






function addTask(){
    const taskNameInput = document.querySelector('.add-task');
    const taskDateInput = document.querySelector('.add-task-date');

    taskNameInput.addEventListener('keypress', (e) => {
        const context = retrieveContext();

        const taskName = taskNameInput.value;
        const taskDate = taskDateInput.value;

        let parentList = '';

        if(context[0] == 'list'){
            parentList = context[1];
        }

        
        

        if(e.key == 'Enter'){
            if(taskName != ''){
                taskNameInput.value = '';
                const newTask = new Task(parentList, taskName, taskDate,'','Incomplete');
                logic.addTask(newTask);
                renderTasks(context[0], context[1]);
            }
        }
    });
}

function activeListIndicator(){

    const sidebarBtns = document.querySelectorAll('.sidebar button');

    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeBtns = document.querySelectorAll('.active');
            if(activeBtns == null)
            {
                btn.classList.add('active');
            }
            else
            {
                activeBtns.forEach(btn => {
                    btn.classList.remove('active');
                })
                btn.classList.add('active');
            }
        })
    })

}

function viewAll(){
    const allBtn = document.querySelector('.view-all');
    const activeList = document.querySelector('.active-list-header');

    allBtn.addEventListener('click', () => {
        activeList.textContent = 'All';
        renderTasks();
    });

}


function filterByDate(){
    const todayBtn = document.querySelector('.view-today');
    const tomorrowBtn = document.querySelector('.view-tomorrow');

    const activeList = document.querySelector('.active-list-header');

    todayBtn.addEventListener('click', () => {
        const today = format(constructNow(), 'dd MMM yy');
        activeList.textContent = 'Today';
        renderTasks('date', today);
    });

    tomorrowBtn.addEventListener('click', () => {
        const tomorrow = format(add(constructNow(),{days: 1,}), 'dd MMM yy');	
        activeList.textContent = 'Tomorrow';
        renderTasks('date', tomorrow);
    });

}




function filterByList(){

    const inboxBtn = document.querySelector('.view-inbox');
    const personalBtn = document.querySelector('.view-personal');
    const workBtn = document.querySelector('.view-work');
    const fitnessBtn = document.querySelector('.view-fitness');
    const learningBtn = document.querySelector('.view-learning');

    const activeList = document.querySelector('.active-list-header');

    inboxBtn.addEventListener('click', () => {
        activeList.textContent = 'Inbox';
        renderTasks('list', 'Inbox');
    });

    personalBtn.addEventListener('click', () => {
        activeList.textContent = 'Personal';
        renderTasks('list', 'Personal');
    });

    workBtn.addEventListener('click', () => {
        activeList.textContent = 'Work';
        renderTasks('list', 'Work');
    });

    fitnessBtn.addEventListener('click', () => {
        activeList.textContent = 'Fitness';
        renderTasks('list', 'Fitness');
    });

    learningBtn.addEventListener('click', () => {
        activeList.textContent = 'Learning';
        renderTasks('list', 'Learning');
    });

}

function disableAddBar(){

    const addTaskBar = document.querySelector('.add-task-bar');
    const statusFilterBtns = document.querySelectorAll('.status-filter>button');

    statusFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(!addTaskBar.classList.contains('disabled')){
                addTaskBar.classList.add('disabled');
            }
        }
        )
    });
}

function enableAddBar(){
    const addTaskBar = document.querySelector('.add-task-bar');

    const schedule_lists_FilterBtns = document.querySelectorAll('.schedule-filter>button , .lists-filter>button');

    schedule_lists_FilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(addTaskBar.classList.contains('disabled')){
                addTaskBar.classList.remove('disabled');
            }
        })
    })
}


function filterByStatus(){
    const completedBtn = document.querySelector('.view-completed');
    const activeList = document.querySelector('.active-list-header');

    completedBtn.addEventListener('click', () => {
        activeList.textContent = 'Completed';
        renderTasks();
    });
}

function viewWontDo(){
    const wontDoBtn = document.querySelector('.view-wontDo');
    const activeList = document.querySelector('.active-list-header');

    wontDoBtn.addEventListener('click', () => {
        activeList.textContent = "Won't do";
        renderTasks();
    });
}

function viewDeleted(){
    const trashBtn = document.querySelector('.view-trash');
    const activeList = document.querySelector('.active-list-header');

    trashBtn.addEventListener('click', () => {
        activeList.textContent = 'Trash';
        renderTasks();
    });
}

function checkTask(){
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.task-checkbox');
        checkbox.addEventListener('click', () => {
            if(checkbox.checked){
                const taskSrc = logic.getTaskById(parseInt(task.dataset.id));
                taskSrc.status = 'Completed';
            }
        });
    })
}


function selectTask(){
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', () => {
            const selectedTasks = document.querySelectorAll('.selected');
            if(selectedTasks == null){
                task.classList.add('selected');
            }
            else{
                selectedTasks.forEach(task => {
                    task.classList.remove('selected');
                })
                task.classList.add('selected');
            }
        })
    })
}

function renderCheckList(){
    const taskChecklist = document.querySelector('.task-checklist-container');
    taskChecklist.innerHTML = '';

    const selectedTask = document.querySelector('.task.selected');
    const taskSrc = logic.getTaskById(parseInt(selectedTask.dataset.id));

    taskSrc.checklist.forEach(item => {
        const checklistItem = document.createElement('div');
        checklistItem.classList.add('checklist-item');
        checklistItem.dataset.id = item.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checklist-checkbox');
        if(item.status == 'Completed'){
            checkbox.checked = true;
        }

        const checklistContent = document.createElement('input');
        checklistContent.classList.add('checklist-content');
        checklistContent.placeholder = 'Press Enter to add list item.';
        checklistContent.value = item.name;

        const deleteChecklistItem = document.createElement('img');
        deleteChecklistItem.classList.add('delete');
        deleteChecklistItem.src = trashIcon;
        deleteChecklistItem.title = 'Delete';

        checklistItem.appendChild(checkbox);
        checklistItem.appendChild(checklistContent);
        checklistItem.appendChild(deleteChecklistItem);

        taskChecklist.appendChild(checklistItem);
    });

    updateChecklist();
}

function updateChecklist(){
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach(item => {
        const selectedTask = document.querySelector('.task.selected');
        const taskSrc = logic.getTaskById(parseInt(selectedTask.dataset.id));
        const itemIndex = taskSrc.getChecklistItemIndexById(parseInt(item.dataset.id));
        const checkbox = item.querySelector('.checklist-checkbox');
        const checklistContent = item.querySelector('.checklist-content');
        const deleteChecklistItem = item.querySelector('.delete');

        checkbox.addEventListener('click', () => {
            if(checkbox.checked){
                taskSrc.checklist[itemIndex].status = 'Completed';
            
            }
            else{
                taskSrc.checklist[itemIndex].status = 'Incomplete';
            }

        });

        checklistContent.addEventListener('input', () => {
            taskSrc.checklist[itemIndex].name = checklistContent.value;
        });

        checklistContent.addEventListener('keypress', (e) =>{
            if(e.key == 'Enter'){
                taskSrc.checklist.splice(itemIndex + 1, 0, new Subtask())
                renderCheckList();
            }
        })

        deleteChecklistItem.addEventListener('click', () => {
            taskSrc.deleteChecklistItem(itemIndex);
            renderCheckList();
        });

        
    });

}

function displayTaskDetails(){
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', () => {
            renderTaskDetails();
            renderCheckList();
            const taskSrc = logic.getTaskById(parseInt(task.dataset.id));

            const taskDate = document.querySelector('.task-date-status>.task-date');
            taskDate.value = format(new Date(taskSrc.date), 'yyyy-MM-dd');

            const taskStatus = document.querySelector('.task-date-status>.task-checkbox');
            if(taskSrc.status == 'Completed'){
                taskStatus.checked = true;
            }
            else{
                taskStatus.checked = false;
            }

            const taskContent = document.querySelector('.task-header>.task-content');
            taskContent.value = taskSrc.name;

            const taskDescription = document.querySelector('.task-description');
            taskDescription.value = taskSrc.description;

            const taskList = document.querySelector('#list-selection');
            taskList.value = taskSrc.parentList;

        })
    })
}




function updateTaskDetails(){
    const context = retrieveContext();
    const contextType = context[0];
    const contextValue = context[1];
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        task.addEventListener('click', () => {
            const taskSrc = logic.getTaskById(parseInt(task.dataset.id));

            const taskDate = document.querySelector('.task-date-status>.task-date');
            const taskStatus = document.querySelector('.task-date-status>.task-checkbox');
            const taskContent = document.querySelector('.task-header>.task-content');
            const taskChecklist = document.querySelector('.task-header>.checklist-icon');
            const taskDescription = document.querySelector('.task-description');
            const taskList = document.querySelector('#list-selection');
            const taskDelete = document.querySelector('.task-actions>.delete-icon');
            const taskRestore = document.querySelector('.task-actions>.restore-icon');
            const taskWontdo = document.querySelector('.task-actions>.wontdo-icon');
            const taskWilldo = document.querySelector('.task-actions>.willdo-icon');

            taskDate.addEventListener('change', () => {
                taskSrc.date = format(new Date(taskDate.value), 'dd MMM yy')
                liveTaskRender();
            });

            taskStatus.addEventListener('click', () => {
                if(taskStatus.checked){
                    taskSrc.status = 'Completed';
                }
                else{
                    taskSrc.status = 'Incomplete';
                }
                renderTasks();
            });

            taskContent.addEventListener('input', () => {
                taskSrc.name = taskContent.value;
                liveTaskRender();
            });

            taskChecklist.addEventListener('click', () =>{
                if(taskSrc.checklist.length == 0)
                {
                    if(!taskDescription.value?.trim()){
                        const subtask = new Subtask();
                        subtask.setName('');
                        taskSrc.addChecklistItem(subtask);
                    }
                    let descriptionLines = taskSrc.description.split('\n');
                    descriptionLines = descriptionLines.filter(line=> line?.trim());
                    descriptionLines.forEach(line => {
                        const subtask = new Subtask();
                        subtask.setName(line);
                        taskSrc.addChecklistItem(subtask);
                    })
                    taskSrc.description = '';
                    taskDescription.value = taskSrc.description;
                    
                }
                else
                {
                    let checklistText = ''
                    taskSrc.checklist.forEach(item => {
                        if(item.name?.trim())
                        {
                            if(taskSrc.checklist.indexOf(item) != 0 || taskDescription.value?.trim())
                            {
                                checklistText += `\n${item.name}`;
                            }
                            else
                            {
                                checklistText += `${item.name}`;
                            }
                            
                        }
                        
                    })
                    taskSrc.description += checklistText;
                    taskDescription.value = taskSrc.description;
                    taskSrc.checklist = [];
                    
                }
                renderCheckList();
            })

            taskDescription.addEventListener('change', () => {
                taskSrc.description = taskDescription.value;
            });

            taskList.addEventListener('change', () => {
                taskSrc.parentList = taskList.value;
                renderTasks();
            });

            if(contextType == 'deleted'){
                taskDelete.addEventListener('click', () => {
                    logic.removeTask(taskSrc.id);
                    renderTasks();
                });

                taskRestore.addEventListener('click', ()=>{
                    taskSrc.deleted = false;
                    renderTasks();
                })
            }
            else{
                taskDelete.addEventListener('click', () => {
                    taskSrc.deleted = true;
                    renderTasks();
                });
            }

            if(contextType == 'wontdo'){
                taskWilldo.addEventListener('click', () => {
                    taskSrc.wontdo = false;
                    renderTasks();
                });
            }
            else if(contextType != 'deleted')
            {
                taskWontdo.addEventListener('click', () => {
                    taskSrc.wontdo = true;
                    renderTasks();
                });
            }

        });
    });    
}

function liveTaskRender(){
    const selectedTask = document.querySelector('.task.selected');
    const taskSrc = logic.getTaskById(parseInt(selectedTask.dataset.id));

    const taskName = selectedTask.querySelector('.task-content');
    const taskList = selectedTask.querySelector('.task-list');
    const taskDate = selectedTask.querySelector('.task-date');
    const taskStatus = selectedTask.querySelector('.task-checkbox')

    taskName.value = taskSrc.name;
    taskList.textContent = taskSrc.parentList;
    taskDate.textContent = taskSrc.date;
    taskStatus.checked = taskSrc.status == 'Completed' ? true : false;
    taskCountIndicator()
}

function updateTaskInfo(){

    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        task.addEventListener('click', () => {
            const taskSrc = logic.getTaskById(parseInt(task.dataset.id));

            const taskName = task.querySelector('.task-content');
            const taskStatus = task.querySelector('.task-checkbox');

            taskName.addEventListener('input', () => {
                taskSrc.name = taskName.value;
                liveTaskDetailsRender();
            });

            taskStatus.addEventListener('change', () => {
                taskSrc.status = taskStatus.checked ? 'Completed' : 'Incomplete';
                renderTasks();
            });
        });
    });

}

function liveTaskDetailsRender(){
    const selectedTask = document.querySelector('.task.selected');
    const taskSrc = logic.getTaskById(parseInt(selectedTask.dataset.id));

    const taskContent = document.querySelector('.task-header>.task-content');
    taskContent.value = taskSrc.name;

    const taskStatus = document.querySelector('.task-date-status>.task-checkbox');
    if(taskSrc.status == 'Completed'){
        taskStatus.checked = true;
    }
    else{
        taskStatus.checked = false;
    }
}
    




export function initLoad()
{
    
    sidebarInit();
    taskbarInit();
    resetTaskDetails();
    addTask();
    viewAll();
    filterByDate();
    filterByList();
    filterByStatus();
    viewWontDo();
    viewDeleted();
    disableAddBar();
    enableAddBar();
    setDefaultDate();  
    activeListIndicator();
}
