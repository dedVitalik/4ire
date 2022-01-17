export const renderGroupForm = (groupFormParent) => {
    let groupFormInnerHtml = `<article class="card card--edit card--group-edit card--black">
    <form class="card__form">
      <div class="card__inner">
        <div class="card__color-bar">
        </div>

        <div class="card__textarea-wrap">
          <input type="text" minlength="1" maxlength="22" placeholder="Назва групи" />
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >Введіть назву групи у поле вище. А нижче виберіть колір-ідентифікатор групи.</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Колір-ідетифікатор</h3>
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
          </div>
        </div>


        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">cancel</button>
        </div>
      </div>
    </form>
    </article>`;

    groupFormParent.insertAdjacentHTML('afterBegin', groupFormInnerHtml);
    const groupFormElement = groupFormParent.querySelector('.card--group-edit');
    return groupFormElement;
}
