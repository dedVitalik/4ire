import { transliterate } from "./utils.js";
import { allTasks } from "./data-retrieving.js";
import { renderCounters } from "./render-counters.js";

export const renderTasks = (tasks, tasksParent, whatWeNeed) => {
    tasksParent.innerHTML = '';
    tasks.forEach(task => {
        let posibleAction;
        if (task.finished === false) {
            posibleAction = task.status === 'new' ? 'розпочати' : 'виконується';
        } else {
            posibleAction = 'на доопрацювання';
        };
        const taskCard = document.createElement("article");
        taskCard.classList.value = `card card--${task.color}`;
        taskCard.innerHTML = `<div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit card__btn--nopointer">
              ${posibleAction}
            </button>
            <button
              type="button"
              class="card__btn card__btn--archive"
            >
              завершити
            </button>
          </div>
          <div class="card__color-bar">
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${task.whatToDo}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${task.deadline}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      const editState = taskCard.querySelector('.card__btn--edit');
      if (task.status === 'new') {
        editState.classList.remove('card__btn--nopointer');
        editState.addEventListener('click', () => {
            editState.classList.add('card__btn--nopointer');
            editState.innerHTML = 'виконується';
            task.status = 'in progress';
            localStorage.setItem('tasks', JSON.stringify(allTasks));
        }, {once: true});
      } else {
          editState.classList.add('card__btn--opacity')
      }
      if (task.finished === true) {
        taskCard.querySelector('.card__btn--archive').innerHTML = '';
        editState.addEventListener('click', () => {
          task.finished = false;
          task.status = 'new';
          taskCard.remove();
          localStorage.setItem('tasks', JSON.stringify(allTasks));
          renderCounters();
        })
      }
      
      const toArchive = taskCard.querySelector('.card__btn--archive');
      toArchive.addEventListener('click', () => {
        toArchive.innerHTML = 'виконано';
        task.finished = true;
        taskCard.remove();
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        renderCounters();
      }, {once: true});

      if (whatWeNeed === 'всі' && !task.finished) {
        tasksParent.insertAdjacentElement('beforeEnd', taskCard);
      } else if (whatWeNeed === task.groupName && !task.finished) {
        tasksParent.insertAdjacentElement('beforeEnd', taskCard);
      } else if (whatWeNeed === 'виконані' && task.finished) {
        tasksParent.insertAdjacentElement('beforeEnd', taskCard);
    }
  });
}