function TaskGroup(groupName, color) {
    return {
        groupName, color
    }
}

function Task(whatToDo, status, deadline, taskGroup) {
    return Object.assign({
        whatToDo, status, deadline, finished: false
    }, taskGroup)
}

export { TaskGroup, Task }

// function Task(whatToDo, status, deadline, taskGroup) {
//     return Object.assign({
//         whatToDo, status, deadline, renderMe() {
//             let taskCard = document.createElement("article");
//             taskCard.classList.value = `card card--${this.color}`;
//             taskCard.innerHTML = `<div class="card__form">
//                 <div class="card__inner">
//                   <div class="card__control">
//                     <button type="button" class="card__btn card__btn--edit">
//                       edit
//                     </button>
//                     <button
//                       type="button"
//                       class="card__btn card__btn--archive"
//                     >
//                       виконано
//                     </button>
//                   </div>
        
//                   <div class="card__color-bar">
//                     <svg class="card__color-bar-wave" width="100%" height="10">
//                       <use xlink:href="#wave"></use>
//                     </svg>
//                   </div>
        
//                   <div class="card__textarea-wrap">
//                     <p class="card__text">${this.whatToDo}</p>
//                   </div>
        
//                   <div class="card__settings">
//                     <div class="card__details">
//                       <div class="card__dates">
//                         <div class="card__date-deadline">
//                           <p class="card__input-deadline-wrap">
//                             <span class="card__date">${this.deadline}</span>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               `;
//             let toArchive = taskCard.querySelector('.card__btn--archive');
//             toArchive.addEventListener('click', () => {
//                 this.status = 'in archive';
//                 console.log(this);
//             });
//             return taskCard;
//         }
//     }, taskGroup)
// }
