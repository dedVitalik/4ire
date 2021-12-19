const display = document.querySelector('div.display > input');
const buttons = document.querySelectorAll('input.button');

const values = {
  displayedValue: null,
  value1: null,
  value2: null,
  sign: false,
};

const calculate = (value) => {
  switch (value) {
    case '+':
      values.sign = true;
      values.value1 += +values.value2;
      display.value = values.value1;
      values.value2 = null;
      break;
    case '=':
      values.value1 += +values.value2;
      display.value = values.value1;
      values.value2 = null;
      break;
    default:
      if (!values.sign) {
        values.value1 = +`${+values.value1}${value}`;
        console.log(values.value1);
        display.value = values.value1;
      } else {
        values.value2 = `${+values.value2}${value}`;
        display.value = +values.value2;
      }
  }
};

buttons.forEach((btn) => {
  btn.addEventListener('click', function () {
    // console.log(this.value);
    calculate(this.value);
  });
});

// display.value = ;
