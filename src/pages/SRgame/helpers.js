const countErrors = (word, value) => {
  let errorCount = 0;
  const valueArr = value.split('');
  valueArr.forEach((el, i) => {
    if (el !== word[i]) {
      errorCount += 1;
    }
  });
  let color = 'color-error-';
  if (errorCount < word.length / 2) {
    color += 'few';
  } else {
    color += 'many';
  }
  return color;
};

const createElement = (element, elementClasses, elementText) => {
  const el = document.createElement(element);
  if (elementClasses) el.classList.add(...elementClasses.split(' '));
  el.textContent = elementText;
  return el;
};

const addZeroToTime = (t) => {
  if (t < 10) return `0${t}`;
  return t;
};

const countDaysInterval = (group, ease) => {
  const interval = {
    1: 1,
    2: 3,
    3: 7,
    4: 10,
    5: 14,
    6: 21,
  };
  const easeCoef = {
    good: 1,
    hard: 0.5,
    easy: 2,
  };
  if (group > 6) return 30 * easeCoef[ease];
  return interval[group] * easeCoef[ease];
};

const getTodayDate = () => {
  const date = new Date();
  return `${addZeroToTime(date.getMonth() + 1)}/${addZeroToTime(date.getDate())}/${date.getFullYear()}`;
};

export const getDate = (date) => `${addZeroToTime(date.getMonth() + 1)}/${addZeroToTime(date.getDate())}/${date.getFullYear()}`;

export const createErrorObj = (elements) => {
  const errObj = {};
  elements.forEach((i) => {
    if (!errObj[i.dataset.id]) errObj[i.dataset.id] = 0;
    const err = Number.isNaN(parseInt(i.dataset.errors, 10)) ? 0 : parseInt(i.dataset.errors, 10);
    errObj[i.dataset.id] += err;
  });
  return errObj;
};

export const createCountObj = (elements) => {
  const countObj = {};
  elements.forEach((i) => {
    if (!countObj[i.dataset.id]) countObj[i.dataset.id] = 0;
    countObj[i.dataset.id] += 1;
  });
  return countObj;
};

export {
  countErrors, createElement, addZeroToTime, countDaysInterval, getTodayDate,
};
