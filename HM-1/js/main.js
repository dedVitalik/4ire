const EUR_RATE = 30.51;
const USD_RATE = 26.35;
const UAH_RATE = 1;
const GBP_RATE = 35.87;
const RUR_RATE = 0.37;
let weAreWorking = true;

do {
  const currencyToChange = prompt('Яку валюту Ви хочете обміняти? Ви можете скористатися сервісом для обміну: EUR, USD, UAH, GBP, RUR').toUpperCase();
  let rateToChange;
  let amountToChange;
  let currencyToReceive;
  let rateToReceive;
  let resultOfChanging;

  switch (currencyToChange) {
    case 'EUR':
      rateToChange = EUR_RATE;
      break;
    case 'USD':
      rateToChange = USD_RATE;
      break;
    case 'UAH':
      rateToChange = UAH_RATE;
      break;
    case 'GBP':
      rateToChange = GBP_RATE;
      break;
    case 'RUR':
      rateToChange = RUR_RATE;
      break;
    default:
      alert('Ви не правильно ввели валюту для обміну, введіть будь-ласка EUR, USD, UAH, GBP або RUR');
      continue;
  }

  do {
    amountToChange = +prompt(`Скільки ${currencyToChange} Ви хочете обміняти?`);
    if (isNaN(amountToChange)) {
      alert('Введіть числове значення!');
    }
  } while (isNaN(amountToChange));

  do {
    currencyToReceive = prompt(`На яку валюту Ви хочете поміняти ${amountToChange} ${currencyToChange}? Введіть будь-ласка EUR, USD, UAH, GBP або RUR`).toUpperCase();

    switch (currencyToReceive) {
      case 'EUR':
        rateToReceive = EUR_RATE;
        break;
      case 'USD':
        rateToReceive = USD_RATE;
        break;
      case 'UAH':
        rateToReceive = UAH_RATE;
        break;
      case 'GBP':
        rateToReceive = GBP_RATE;
        break;
      case 'RUR':
        rateToReceive = RUR_RATE;
        break;
      default:
        alert('Ви не правильно ввели валюту, введіть будь-ласка EUR, USD, UAH, GBP або RUR');
        continue;
    }
  } while (!rateToReceive);

  resultOfChanging = rateToChange*UAH_RATE/rateToReceive*amountToChange;
  alert(`Ви отримаєте ${resultOfChanging.toFixed(2)} ${currencyToReceive}`);
  weAreWorking = confirm('Проведемо операцію ще раз?');
} while (weAreWorking);
