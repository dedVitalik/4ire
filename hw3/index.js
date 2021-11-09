/*

*зауваження щодо логіки трактування ТЗ:

Відповідно до розділу про типи даних офіційної специфікації EcmaScript:
https://262.ecma-international.org/12.0/#sec-ecmascript-language-types

індетифікуємо такі типи (8):

number
bigint
string
boolean
null
symbol
undefined
object

Відповідно ми:

1. Не визначаємо, наприклад, масив, як окремий тип даних, а відносимо його до об'єктів
2. Обробляємо помилку JS при якій typeof null видає об'єкт

*/

const filterBy = (inputArray, typeOfData) => {

  const allDataTypes = ['number', 'bigint', 'string', 'boolean', 'null', 'symbol', 'undefined', 'object'];
  /* Запускаємо виконання функції лише якщо на вхід перший аргумент масив, а другий належить до одного з 8 типів даних
  Тип можна вводити ВЕЛИКИМИ та малими, null/undefined можна без "лапок"
  */  
  typeOfData = String(typeOfData).toLowerCase();
  if (Array.isArray(inputArray) && allDataTypes.includes(typeOfData)) {

    return inputArray.filter((element) => {
      return typeOfData === 'null' ? element !== null : typeof element !== typeOfData
    });
    }
    console.log ('Не вірні вхідні дані')
    }

    const testArray = [null, 'word', [1, 2], 22, {name: 'Jack', age: 44}, undefined, 1n, true, NaN, Infinity, Symbol('f')];
    console.log(filterBy(testArray, 'number'));