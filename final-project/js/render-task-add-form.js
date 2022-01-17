export const renderTaskForm = (groups, taskFormParent) => {
    let chosingGroupOptions = '';
    groups.forEach(group => {
        if (group.groupName !== 'Виконані') {
            chosingGroupOptions += `<option>${group.groupName}</option>`
        }
    });
    let taskFormInnerHtml = `<article class="card card--edit card--pink">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Напишіть що потрібно виконати..."
              name="text"
            >Напишіть що потрібно виконати...</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <h3 class="card__dates-title">deadline</h3>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="date"
                    name="date"
                    value="2022-01-17" min="2022-01-17"
                  />
                </label>
              </fieldset>

            </div>
          </div>

          <div class="card__details">
            <div class="card__group">
              <select>
                ${chosingGroupOptions}
              </select>
            </div>
          </div>


<!--
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-1"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
                checked
              />
              <label
                for="color-black-1"
                class="card__color card__color--black"
                >black</label
              >
              <input
                type="radio"
                id="color-yellow-1"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
              />
              <label
                for="color-yellow-1"
                class="card__color card__color--yellow"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-1"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
              />
              <label
                for="color-blue-1"
                class="card__color card__color--blue"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-1"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
              />
              <label
                for="color-green-1"
                class="card__color card__color--green"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-1"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
              />
              <label
                for="color-pink-1"
                class="card__color card__color--pink"
                >pink</label
              >
            </div>
          </div> -->
        </div>


        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">cancel</button>
        </div>
      </div>
    </form>
    </article>`;

    taskFormParent.insertAdjacentHTML('afterBegin', taskFormInnerHtml);
    const taskFormElement = taskFormParent.querySelector('.card--edit');
    return taskFormElement;
}
