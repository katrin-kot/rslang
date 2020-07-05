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

export { countErrors, createElement };
