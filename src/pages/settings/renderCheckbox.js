export function renderCheckbox(elem, fragment, userSettings) {
  const div = document.createElement('div');
  div.classList.add('form-check');
  div.innerHTML = `
    <input class="form-check-input" type="checkbox" value="" data-name=${elem.name} id="defaultCheck1">
    <label class="form-check-label" for="defaultCheck1">
  ${elem.textContent}
    </label>`;
  fragment.appendChild(div);
  const checkbox = div.querySelector('.form-check-input');
  if (userSettings.optional[elem.name] === true) {
    if (elem.name === 'isShowAllLearningWords') {
      fragment.querySelectorAll('.form-control').forEach((item) => { item.setAttribute('disabled', true); });
    }
    checkbox.checked = true;
  } else {
    if (elem.name === 'isShowAllLearningWords') {
      fragment.querySelectorAll('input').forEach((item) => { item.removeAttribute('disabled'); });
    }
    checkbox.checked = false;
  }
}
