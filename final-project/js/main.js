import { Task, TaskGroup } from './classes.js';
import { allTasks, allTaskGroups } from './data-retrieving.js';
import { renderTaskGroups } from './render-groups.js';
import { renderTaskForm } from './render-task-add-form.js';
import { renderTasks } from './render-tasks.js';
import { renderGroupForm } from './render-group-add-form.js';
import { mainElements } from './main-elements.js';
import { renderCounters } from './render-counters.js';
import { pageState } from './state.js';

renderTaskGroups(allTaskGroups, mainElements.groupsParentElem);
renderTasks(allTasks, mainElements.tasksParentElem, 'всі');
renderCounters();


mainElements.addGroupBtn.addEventListener('click', () => {
    const groupForm = renderGroupForm(mainElements.tasksParentElem);
    const submitFormBtn = groupForm.querySelector('button.card__save');
    const cancelFormBtn = groupForm.querySelector('button.card__delete');
    const groupColorParentElement = groupForm.querySelector('.card__colors-wrap');
    let color = 'black';
    groupColorParentElement.addEventListener('click', (evt) => {
        if (evt.target.childNodes.length && evt.target.innerHTML.toString().length < 20) {
            color = evt.target.innerHTML.toString();
            groupForm.classList.value=`card card--edit card--group-edit card--${color}`;
        }
    });

    submitFormBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        const groupName = groupForm.querySelector('.card__textarea-wrap > input').value;
        allTaskGroups.push(new TaskGroup(groupName, color));
        groupForm.remove();
        mainElements.groupsParentElem.innerHTML = '';
        renderTaskGroups(allTaskGroups, mainElements.groupsParentElem);
        localStorage.setItem('groups', JSON.stringify(allTaskGroups));
        renderCounters();
    })
    cancelFormBtn.addEventListener('click', () => groupForm.remove());
});

mainElements.addTaskBtn.addEventListener('click', () => {
    const taskForm = renderTaskForm(allTaskGroups, mainElements.tasksParentElem);
    const submitFormBtn = taskForm.querySelector('button.card__save');
    const cancelFormBtn = taskForm.querySelector('button.card__delete');
    const groupOptionsElement = taskForm.querySelector('.card__group select');
    let selectedGroup = allTaskGroups[0];

    groupOptionsElement.addEventListener('change', () => {
        selectedGroup = allTaskGroups.find(group => group.groupName === groupOptionsElement.value);
        taskForm.classList.value = `card card--edit card--${selectedGroup.color}`;
        });

    submitFormBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        const taskToDo = taskForm.querySelector('textarea.card__text').value;
        const deadline = taskForm.querySelector('input.card__date').value;
        allTasks.push(new Task(taskToDo, 'new', deadline, selectedGroup));
        taskForm.remove();
        mainElements.tasksParentElem.innerHTML = '';
        renderTasks(allTasks, mainElements.tasksParentElem, pageState.currentFilter);
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        renderCounters();
    })
    cancelFormBtn.addEventListener('click', () => taskForm.remove());
});

const clearStorageBtn = document.querySelector('button.clean-storage');
clearStorageBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})
