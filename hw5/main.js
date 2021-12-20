const display = document.querySelector('div.display > input'),
  buttons = document.querySelector('div.keys');

display.insertAdjacentHTML(
  'afterend',
  '<div hidden style="position: absolute; top: 5px; left: 5px; font-weight: 700;">M</div>'
);

const memoryVisualizationElement = document.querySelector('div.display > div');

buttons.addEventListener('click', (evt) => {
  if (typeof evt.target.value !== 'undefined') calculate(evt.target.value);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key.match(/[0-9%\/*\-+\(\)=]|Backspace|Enter|c|C/)) {
    if (evt.key === 'Enter') calculate('=');
    else calculate(evt.key.toUpperCase());
  }
});

const operations = {
  plus: (num1, num2) => `${+num1 + +num2}`,
  minus: (num1, num2) => `${+num1 - +num2}`,
  divide: (num1, num2) => {
    num2 = num2 === '' ? 1 : num2;
    return num2 == 0 ? 'На ноль неможна!!!' : `${+num1 / +num2}`;
  },
  multiply: (num1, num2) => {
    num2 = num2 === '' ? 1 : num2;
    return `${+num1 * +num2}`;
  },
};

const calcState = {
  value1: '',
  value2: '',
  memory: 0,
  whatWeDo: null,
  mrcCleaning: false,
};

const calculate = (value) => {
  let temporaryMemory;
  // controlMemoryIcon - службова функція, забирає індикатор наявності даних в памяті якщо там 0
  const controlMemoryIcon = (memoryValue) => {
    if (memoryValue !== 0) {
      memoryVisualizationElement.removeAttribute('hidden');
    } else {
      memoryVisualizationElement.setAttribute('hidden', '');
    }
  };

  const cleaning = () => {
    calcState.value1 = '';
    calcState.value2 = '';
    calcState.whatWeDo = null;
    display.value = '0';
  };

  const makeOperation = (state, operation) => {
    function decimalCount(checkingValueInString) {
      if (checkingValueInString.includes('.')) {
        return checkingValueInString.split('.')[1].length;
      }
      return 0;
    }
    const toFixCount = Math.max(decimalCount(state.value1), decimalCount(state.value2)) + 1;
    state.whatWeDo = operation;
    state.value1 = state.whatWeDo(state.value1, state.value2);
    if (state.value1.includes('.')) {
      const indexToCut = state.value1.indexOf('.') + toFixCount;
      state.value1 = state.value1.substr(0, indexToCut);
    }
    display.value = state.value1;
    state.value2 = '';
    return state.value1;
  };

  const renderDisplayingValue = (value) => {
    if (value[0] === 0) {
      return value.substr(1);
    }
    if (value[0] === '.') {
      return 0 + value;
    }
    return value;
  };

  if (value !== 'mrc') {
    calcState.mrcCleaning = false;
  }
  switch (value) {
    case '+':
      makeOperation(calcState, operations.plus);
      break;
    case '-':
      makeOperation(calcState, operations.minus);
      break;
    case '/':
      makeOperation(calcState, operations.divide);
      break;
    case '*':
      makeOperation(calcState, operations.multiply);
      break;
    case 'm+':
      // + перестраховка на випадок якщо юзер спробує занести в память помилку ділення на 0
      temporaryMemory = calcState.whatWeDo === null ? +calcState.value1 : +makeOperation(calcState, calcState.whatWeDo);
      if (isNaN(temporaryMemory)) {
        temporaryMemory = 0;
        cleaning();
      }
      calcState.memory += temporaryMemory;
      controlMemoryIcon(calcState.memory);
      break;
    case 'm-':
      temporaryMemory = calcState.whatWeDo === null ? +calcState.value1 : +makeOperation(calcState, calcState.whatWeDo);
      // + перестраховка
      if (isNaN(temporaryMemory)) {
        temporaryMemory = 0;
        cleaning();
      }
      calcState.memory -= temporaryMemory;
      controlMemoryIcon(calcState.memory);
      break;
    case '=':
      if (calcState.whatWeDo !== null) {
        makeOperation(calcState, calcState.whatWeDo);
      }
      break;
    case 'mrc':
      if (!calcState.whatWeDo) {
        calcState.value1 = `${calcState.memory}`;
        display.value = renderDisplayingValue(calcState.value1);
      } else {
        calcState.value2 = `${calcState.memory}`;
        display.value = renderDisplayingValue(calcState.value2);
      }
      if (calcState.mrcCleaning === true) {
        calcState.memory = 0;
      }
      calcState.mrcCleaning = true;
      controlMemoryIcon(calcState.memory);
      break;
    case 'C':
      cleaning();
      break;
    case 'BACKSPACE':
      if (!calcState.whatWeDo && calcState.value1.length > 0) {
        calcState.value1 = calcState.value1.substring(0, calcState.value1.length - 1);
        display.value = renderDisplayingValue(calcState.value1);
      } else if (calcState.value2.length > 0) {
        calcState.value2 = calcState.value2.substring(0, calcState.value2.length - 1);
        display.value = renderDisplayingValue(calcState.value2);
      }
      break;
    default:
      if (!calcState.whatWeDo) {
        value = value === '.' && calcState.value1.includes('.') ? '' : value;
        calcState.value1 += value;
        display.value = renderDisplayingValue(calcState.value1);
      } else {
        value = value === '.' && calcState.value2.includes('.') ? '' : value;
        calcState.value2 += value;
        display.value = renderDisplayingValue(calcState.value2);
      }
  }
};
