export function renderCheckbox(elem, fragment, defaultSettings) {
  const div = document.createElement('div');
  div.classList.add('form-check');
  div.innerHTML = `
    <input class="form-check-input" type="checkbox" value="" data-name=${elem.name} id="defaultCheck1">
    <label class="form-check-label" for="defaultCheck1">
  ${elem.textContent}
    </label>`;
  fragment.appendChild(div);
  const checkbox = div.querySelector('.form-check-input');
  if (defaultSettings.optional[elem.name] === true) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
}
