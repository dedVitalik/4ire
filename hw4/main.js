/*

ЕІ - енергетична інфраструктура
Базова одиниця виміру - МВт (мегават)

*/

const DAY_LENGTH = 12;

// функція, що повертає випадкове ціле число в заданому проміжку
const getRandIntBetween = function (from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
};

/*
масив з типами енергетичної інфраструктури:
кожен елемент масиву об'єкт, що описує тип одиниці енерг. інфраструктури
*/

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

// функція, що повертає об'єкт енергетичної інфраструктури
const renderEnergyObj = (typeOfEnergyObj) => {
  switch (typeOfEnergyObj.type) {
    case 'station':
      const currentPowerLimit = getRandIntBetween(1, typeOfEnergyObj.powerLimit);
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

// створюємо енергетичну інфраструктуру міста (об'єкт), вигляд:
// stations: [{}{}{}]
// houses: [{}{}{}]....
const cityEnergyStructure = {};
typesOfEnergyObjects.forEach((type) => {
  const numberOfObjectsThisType = getRandIntBetween(1, type.numberLimit);
  const itemsThisType = [];
  for (let i = 0; i < numberOfObjectsThisType; i++) {
    itemsThisType.push(renderEnergyObj(type));
  }
  // лінії електропередач одразу сортуємо в порядку зростання ціни
  if (type.type === 'line') {
    itemsThisType.sort((lineA, lineB) => (lineA.price > lineB.price ? 1 : -1));
  }
  cityEnergyStructure[`${type.type}s`] = itemsThisType;
});

console.log(cityEnergyStructure);

// функція, що повертає баланс нічного та денного виробництва/споживання
const getEnergyBalance = (...energyStructureItems) => {
  const energyBalance = {
    dayPowerBalance: 0,
    nightPowerBalance: 0,
  };
  energyStructureItems.forEach((items) => {
    items.forEach((item) => {
      energyBalance.dayPowerBalance += item.dayPower();
      energyBalance.nightPowerBalance += item.nightPower();
    });
  });
  energyBalance.dayPowerBalance = Math.round(energyBalance.dayPowerBalance * 1000) / 1000;
  energyBalance.nightPowerBalance = Math.round(energyBalance.nightPowerBalance * 1000) / 1000;
  return energyBalance;
};

let cityPowerBalance = getEnergyBalance(
  cityEnergyStructure.stations,
  cityEnergyStructure.sunStations,
  cityEnergyStructure.houses
);
console.log(cityPowerBalance);

// функція що повертає об'єкт з даними скільки можемо купити чи продати, та скільки це буде вартувати грошей
const getProfit = (powerBalance, lines, length) => {
  const energyResult = {};
  energyResult.quantity = powerBalance * length;
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
      console.log(i, powerBalance, pricePower);
    } else {
      pricePower += (lines[i].power - powerBalance) * lines[i].price;
      powerBalance = 0;
    }
    i += 1;
  }
  energyResult.profitable = profitable;
  energyResult.cost = Math.round(pricePower * 1000) / 1000;
  return energyResult;
};

// викликаємо функцію прорахунку денного павербеленс

let CityPowerDayProfitability = getProfit(cityPowerBalance.dayPowerBalance, cityEnergyStructure.lines, DAY_LENGTH);
console.log(CityPowerDayProfitability);
