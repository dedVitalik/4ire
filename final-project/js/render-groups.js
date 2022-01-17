import { transliterate } from './utils.js';
import { renderTasks } from './render-tasks.js';
import { allTasks } from './data-retrieving.js';
import { mainElements } from "./main-elements.js";
import { renderCounters } from './render-counters.js';
import { pageState } from './state.js';

export const renderTaskGroups = (groups, groupsParent) => {
    const makeOneItem = (groupName, color) => {
        let groupItemElement = document.createElement("div");
        groupItemElement.classList.value = `filter__label filter__label--${color ? color : 'gray'}`;
        groupItemElement.innerHTML = `${groupName} <span class="filter__${transliterate(groupName).toLowerCase().replace(/\s/g, '-')}-count">1</span>`;

        groupItemElement.addEventListener('click', () => {
            renderTasks(allTasks, mainElements.tasksParentElem, groupName);
            pageState.currentFilter = groupName;
        })
        return groupItemElement;
    };
    groupsParent.insertAdjacentElement('beforeEnd', makeOneItem('всі'));
    groups.forEach(group => {
        groupsParent.insertAdjacentElement('beforeEnd', makeOneItem(group.groupName, group.color));
    });
    groupsParent.insertAdjacentElement('beforeEnd', makeOneItem('виконані'));
    renderCounters();
}
