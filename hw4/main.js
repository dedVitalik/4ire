/*
- ЕІ - енергетична інфраструктура
- Базова одиниця виміру - МВт / MW (мегават)
- енергію завжди транспортуємо за найнижчою ціною, не залежно купувати треба чи продавати
- максимальну кількість об'єктів ЕІ для рандома підібрано з розрахунку, щоб при оновленнях сторінки
ми могли отримати всі варіанти: коли баланси дня ночі позитивні, негативні, різні;
коли кількість ліній електропередач є надлишковою і коли їх не вистачає
*/

const DAY_LENGTH = 9,
  PRICE_PER_MW = 120;

// масив з типами об'єктів ЕІ, включає в себе також значення скільки таких об'єктів ЕІ може бути в місті макс.
const typesOfEnergyObjects = [
  {
    type: 'station',
    powerLimit: 100,
    numberLimit: 5,
  },
  {
    type: 'sunStation',
    powerLimit: 5,
    numberLimit: 30,
  },
  {
    type: 'house',
    numberLimit: 300,
    flatsNumberLimit: 400,
    dayPowerPerFlat: -4,
    nightPowerPerFlat: -1,
  },
  {
    type: 'line',
    numberLimit: 10,
    powerLimit: 10,
    priceLimit: 55,
  },
];

// допоміжна функція, повертає випадкове ціле число в заданому проміжку
const getRandIntBetween = function (from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
};

// допоміжна функція, генерує об'єкт ЕІ за його типом
const renderEnergyObj = (typeOfEnergyObj) => {
  switch (typeOfEnergyObj.type) {
    case 'station':
      return {
        type: typeOfEnergyObj.type,
        power: getRandIntBetween(1, typeOfEnergyObj.powerLimit),
        dayPower: function () {
          return this.power;
        },
        nightPower: function () {
          return this.power;
        },
      };
    case 'sunStation':
      return {
        type: typeOfEnergyObj.type,
        power: getRandIntBetween(1, typeOfEnergyObj.powerLimit),
        dayPower: function () {
          return this.power;
        },
        nightPower: function () {
          return 0;
        },
      };
    case 'house':
      return {
        type: typeOfEnergyObj.type,
        numberOfFlats: getRandIntBetween(1, typeOfEnergyObj.flatsNumberLimit),
        dayPower: function () {
          return this.numberOfFlats * -0.004;
        },
        nightPower: function () {
          return this.numberOfFlats * -0.001;
        },
      };
    case 'line':
      return {
        type: typeOfEnergyObj.type,
        power: getRandIntBetween(1, typeOfEnergyObj.powerLimit),
        price: getRandIntBetween(1, typeOfEnergyObj.priceLimit),
      };
  }
};

// допоміжна функція, що повертає баланс нічного та денного виробництва/споживання
const getEnergyBalance = (energyStructureItems) => {
  const energyBalance = {
    dayPowerBalance: 0,
    nightPowerBalance: 0,
  };
  energyStructureItems.forEach((item) => {
    energyBalance.dayPowerBalance += item.dayPower();
    energyBalance.nightPowerBalance += item.nightPower();
  });
  return energyBalance;
};

/*
функція генерації ЕІ міста, схематично (результат) виглядає так:
stations: [{}{}{}],
sunStations: [{}{}{}],
houses: [{}{}{}],
lines:: [{}{}{}],
dayPowerBalance: x,
nightPowerBalance: y
*/
const getCityEnergyStructure = (typesOfEnergyObjects) => {
  const cityEnergyStructure = {
    dayPowerBalance: 0,
    nightPowerBalance: 0,
  };
  typesOfEnergyObjects.forEach((type) => {
    const numberOfObjectsThisType = getRandIntBetween(1, type.numberLimit);
    const itemsThisType = [];
    for (let i = 0; i < numberOfObjectsThisType; i++) {
      itemsThisType.push(renderEnergyObj(type));
    }
    // лінії електропередач одразу сортуємо в порядку зростання ціни
    if (type.type === 'line') {
      itemsThisType.sort((lineA, lineB) => (lineA.price > lineB.price ? 1 : -1));
    } else {
      cityEnergyStructure.dayPowerBalance += getEnergyBalance(itemsThisType).dayPowerBalance;
      cityEnergyStructure.nightPowerBalance += getEnergyBalance(itemsThisType).nightPowerBalance;
    }
    cityEnergyStructure[`${type.type}s`] = itemsThisType;
    cityEnergyStructure.dayPowerBalance = Math.round(cityEnergyStructure.dayPowerBalance * 1000) / 1000;
    cityEnergyStructure.nightPowerBalance = Math.round(cityEnergyStructure.nightPowerBalance * 1000) / 1000;
  });
  return cityEnergyStructure;
};

// домоміжна, функція що повертає об'єкт з даними скільки можемо купити чи продати MBт/год,
// скільки буде коштувати транспортування цієї кількості енергії, вартість цього обсягу енергії
const getProfit = (powerBalance, lines, length, price) => {
  const energyResult = {};
  energyResult.quantity = Math.round(powerBalance * length * 1000) / 1000;
  let profitable = false;
  if (powerBalance > 0) {
    profitable = true;
  }
  powerBalance = Math.abs(powerBalance);
  let i = 0;
  pricePower = 0;
  while (powerBalance > 0 && i < lines.length) {
    if (powerBalance >= lines[i].power) {
      powerBalance -= lines[i].power;
      pricePower += lines[i].power * lines[i].price;
    } else {
      pricePower += (lines[i].power - powerBalance) * lines[i].price;
      powerBalance = 0;
    }
    i += 1;
  }
  energyResult.profitable = profitable;
  energyResult.transportCost = Math.round(length * pricePower * 1000) / 1000;
  console.log();
  energyResult.energyCost = Math.round(energyResult.quantity * price * 1000) / 1000;
  return energyResult;
};

// Та да да дам, насолоджуємося результатами роботи функцій:

// генеруємо ЕІ міста та виводимо в консоль
const cityEnergyStructure = getCityEnergyStructure(typesOfEnergyObjects);
console.log(cityEnergyStructure);

// рахуємоо профіти
const cityPowerDayProfitability = getProfit(
  cityEnergyStructure.dayPowerBalance,
  cityEnergyStructure.lines,
  DAY_LENGTH,
  PRICE_PER_MW
);

const cityPowerNightProfitability = getProfit(
  cityEnergyStructure.nightPowerBalance,
  cityEnergyStructure.lines,
  24 - DAY_LENGTH,
  PRICE_PER_MW
);

// і виводимо в консоль
console.log(
  `Щодня місто ${cityPowerDayProfitability.profitable ? 'продаватиме' : 'купуватиме'} ${Math.abs(
    cityPowerDayProfitability.quantity
  )} МВт/год електроенергії, на суму ${Math.abs(
    cityPowerDayProfitability.energyCost
  )} грошових одиниць. Транспортні витрати при цьому складуть ${
    cityPowerDayProfitability.transportCost
  } грошових одиниць`
);

console.log(
  `Щоночі місто ${cityPowerNightProfitability.profitable ? 'продаватиме' : 'купуватиме'} ${Math.abs(
    cityPowerNightProfitability.quantity
  )} МВт/год електроенергії, на суму ${Math.abs(
    cityPowerNightProfitability.energyCost
  )} грошових одиниць. Транспортні витрати при цьому складуть ${
    cityPowerNightProfitability.transportCost
  } грошових одиниць`
);

// P.S. транспортні витрати дня і ночі можуть бути однаковими або не пропорційні кількості транспортованої енергії
// вдень та вночі у випадках, коли у нас нестача транспортних потужностей
