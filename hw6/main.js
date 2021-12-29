// Примітка по верстці. Розміщення елементів в попапі таке як і задумувалося, візуалку підглянув ось тут:
// https://liniakino.com/movies/?id=9592
// Тобто на полоску з назвою фільма трохи "заїжає" постер

// утіліта, масив об'єктів з жанрами перетворює в рядок жанрів для виводу на сайті
const genresToString = (genres) => {
  let genresInString = '';
  for (genre of genres) {
    genresInString += `${genre.genre}, `;
  }
  return genresInString.slice(0, -2);
};

const fetchParams = {
  method: 'GET',
  headers: {
    'X-API-KEY': '1be6749b-dbf1-4f49-814f-8b1bf84b0931',
    'Content-Type': 'application/json',
  },
};

// функція що робить все ) генератор постерів, попапів, отримувач відповідей з сервера
function makeFilmCard(film) {
  const contentBlock = document.querySelector('.main-content'),
    posterElement = document.createElement('div'),
    filmPopup = document.querySelector('.film-popup'),
    posterInfo = `<span class="film-poster__art">${film.genres[0].genre}</span>
    <img class="film-poster__img" src="${film.posterUrl}" alt="#">
    <div class="film-poster__info">
      <time class="film-poster__year">${film.year}</time>
      <h3 class="film-poster__title">${film.nameRu}</h3>
      <p class="film-poster__description">${film.description}</p>
    </div>`;
  posterElement.classList.add('film-poster');
  posterElement.innerHTML = posterInfo;

  // функція генерації і відображення попапа
  function showFilmPopup() {
    const allGenres = genresToString(film.genres);
    // для, наприклад, російських фільмів немає "оригінальної" назви
    if (!film.nameOriginal) {
      film.nameOriginal = film.nameRu;
    }
    const filmInfo = `<h2 class="film-popup__title"><span>${film.nameRu}</span></h2>
    <button class="film-popup__closing"></button>
    <img class="film-popup__img" src="${film.posterUrl}" alt="">
      <ul class="film-popup__description-list">
        <li class="film-popup__description-item">
          <span class="film-popup__description-property">Оригинальное название:</span>
          <span class="film-popup__description-value">${film.nameOriginal}</span>
        </li>
        <li class="film-popup__description-item">
          <span class="film-popup__description-property">Год:</span>
          <span class="film-popup__description-value" id="genres">${film.year}</span>
        </li>
        <li class="film-popup__description-item">
          <span class="film-popup__description-property">Жанр:</span>
          <span class="film-popup__description-value" id="genres">${allGenres}</span>
        </li>
        <li class="film-popup__description-item">
          <span class="film-popup__description-property">Оценка критиков:</span>
          <span class="film-popup__description-value">${film.ratingFilmCritics}</span>
        </li>
        <li class="film-popup__description-item">
          <span class="film-popup__description-property">Рейтинг Imdb:</span>
          <span class="film-popup__description-value">${film.ratingImdb}</span>
        </li>
        <li class="film-popup__description-item">
          <span class="film-popup__description-property">Рейтинг KinoPoisk:</span>
          <span class="film-popup__description-value">${film.ratingKinopoisk}</span>
        </li>
        <li class="film-popup__description-item">
          <p class="film-popup__description">${film.description}</p>
        </li>
    </ul>`;
    filmPopup.innerHTML = filmInfo;
    filmPopup.classList.remove('hidden'); // робимо попап видимим
    const popupClosingButton = document.querySelector('.film-popup__closing');
    popupClosingButton.addEventListener('click', popupClosingHandler); // навішуємо хендлер на клік по закривашці
  }

  // Хендлери
  const addPosterHadler = function () {
    if (filmPopup && !filmPopup.classList.contains('hidden')) {
      popupClosingHandler();
    } else {
      showFilmPopup();
    }
  };
  const popupClosingHandler = function () {
    filmPopup.classList.add('hidden');
  };

  // "публікація карточки фільма"
  posterElement.addEventListener('click', addPosterHadler);
  contentBlock.insertAdjacentElement('beforeend', posterElement);
}

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('X-API-KEY', '1be6749b-dbf1-4f49-814f-8b1bf84b0931');

// отримуємо дані з сервера
let promise = fetch(
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1',
  fetchParams
);
promise
  .then((res) => res.json())
  .then((data) => {
    let fullFilms = data.films;
    async function getFilmsDetails(films) {
      for (let i = 0; i < films.length; i++) {
        const filmParsingURI = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${films[i].filmId}`;
        let response = await fetch(filmParsingURI, fetchParams);
        let thisFilm = await response.json();
        Object.assign(films[i], thisFilm);
        makeFilmCard(films[i]);
      }
    }
    getFilmsDetails(fullFilms);
  });
