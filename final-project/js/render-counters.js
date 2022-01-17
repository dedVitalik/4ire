import { mainElements } from "./main-elements.js";
import { allTasks } from "./data-retrieving.js";
import { transliterate } from "./utils.js";

export const renderCounters = () => {
    const countPlaces = mainElements.groupsParentElem.querySelectorAll('.filter__label > span');
    countPlaces.forEach (place => {
        const groupNameEng = place.classList.value.replace('filter__', '').replace('-count', '');
           switch (groupNameEng) {
            case 'vsi':
                let allActive = allTasks.filter((task) => {
                    return !task.finished;
                });
                place.innerHTML = allActive.length;
                break;
            case 'vikonani':
                let allArchived = allTasks.filter((task) => {
                    return task.finished;
                });
                place.innerHTML = allArchived.length;
                break;
            default:
                let filtered = allTasks.filter((task) => {
                    return groupNameEng === transliterate(task.groupName).toLowerCase().replace(/\s/g, '-') && !task.finished;
                });
                place.innerHTML = filtered.length;
                break;
        }
    })
}