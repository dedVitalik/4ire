let currencyToChange = prompt('Яку валюту Ви хочете обміняти? Ви можете скористатися сервісом для обміну: EUR, USD, UAH, GBP, RUR').toLowerCase();
let rateToChange;
let amountToReceive;
let 

switch (currencyToChange) {
  case "eur":
    console.log("Oranges are $0.59 a pound.");
    break;
  case "Apples":
    console.log("Apples are $0.32 a pound.");
    break;
  case "Bananas":
    console.log("Bananas are $0.48 a pound.");
    break;
  case "Cherries":
    console.log("Cherries are $3.00 a pound.");
    break;
  case "Mangoes":
  case "Papayas":
    console.log("Mangoes and papayas are $2.79 a pound.");
    break;
  default:
    console.log("Sorry, we are out of " + expr + ".");
}

console.log("Is there anything else you'd like?");