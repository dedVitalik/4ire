import { Task, TaskGroup } from './classes.js';

let allTasks = [];
let allTaskGroups = [];

if (localStorage.getItem('groups')) {
    allTaskGroups = JSON.parse(localStorage.getItem('groups'));
} else {
    allTaskGroups.push(new TaskGroup('Рожева', 'pink'));
    allTaskGroups.push(new TaskGroup('Зелена', 'green'));
}

if (localStorage.getItem('tasks')) {
    allTasks = JSON.parse(localStorage.getItem('tasks'));
} else {
    allTasks.push(new Task('Завдання 1 (рожева)', 'new', '2022-25-10', allTaskGroups[0]));
    allTasks.push(new Task('Завдання 2 (зелена)', 'new', '2022-25-10', allTaskGroups[1]));
    allTasks.push(new Task('Завдання 3 (рожева)', 'new', '2022-25-10', allTaskGroups[0]));
    allTasks.push(new Task('Завдання 4 (зелена)', 'new', '2022-25-10', allTaskGroups[1]));
    allTasks.push(new Task('Завдання 5 (рожева)', 'new', '2022-25-10', allTaskGroups[0]));
}

export { allTasks, allTaskGroups }