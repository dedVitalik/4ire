/*
За обобщенную последовательность Фибоначчи принята следующая двусторонне бесконечная последовательность
(по материалам из Википедии — свободной энциклопедии:
https://ru.wikipedia.org/wiki/%D0%A7%D0%B8%D1%81%D0%BB%D0%B0_%D0%A4%D0%B8%D0%B1%D0%BE%D0%BD%D0%B0%D1%87%D1%87%D0%B8)

n	    …	−10	 −9 	−8	−7	−6 −5	−4	−3	−2	−1	0 1	2	3	4	5	6	7 	8 	9	  10	…
F_{n}	…	−55	 34	 −21	13	−8 	5	−3	 2  −1	 1  0	1	1	2	3	5	8	13	21	34	55	…

, где n - порядковый номер числа Фибоначчи,
F_{n} - число Фибоначчи
*/

const fiboNumberByIndex = (index, fiboNumber0 = 0, fiboNumber1 = 1) => {
  if (index === 0) {
    return fiboNumber0;
  }
  const sign = Math.sign(index);
  let fiboNumber2;
  for (let i = sign; Math.abs(i) <= Math.abs(index); i += 1*sign) {
    fiboNumber2 = fiboNumber0*sign + fiboNumber1;
    if (sign < 0) {
      fiboNumber1 = fiboNumber0;
      fiboNumber0 = fiboNumber2;
    } else {
      fiboNumber0 = fiboNumber1;
      fiboNumber1 = fiboNumber2;
    }
  }
  return fiboNumber0;
};

let letsCount = true;
do {
  const fiboIndex = +prompt('Число с каким порядковым номером в обобщенной последовательности Фибоначчи Вы хотите найти?');
  const isInputCorrect = !isNaN(fiboIndex) && Number.isInteger(fiboIndex);

  if (!isInputCorrect) {
    alert('Будьте внимательны, введите целое число!');
    continue;
  }
  alert (`Искомое Вами число (с порядковым номером ${fiboIndex} в обобщенной последовательности Фибоначчи) = ${fiboNumberByIndex(fiboIndex)}`);
  letsCount = confirm('Посчитаем еще раз?');
} while (letsCount);
