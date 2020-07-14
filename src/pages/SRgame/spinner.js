export const renderSpinner = () => {
  const template = `
  <svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>`;
  const div = document.createElement('div');
  div.innerHTML += template;
  document.body.append(div);
}

export const showSpinner = () => {
  if (document.querySelector('.spinner').classList.contains('display-none')) {
    document.querySelector('.spinner').classList.remove('display-none');
  }
  document.querySelector('.spinner').classList.add('show');
};

export const hideSpinner = () => {
  if (document.querySelector('.spinner').classList.contains('show')) {
    document.querySelector('.spinner').classList.remove('show');
  }
  document.querySelector('.spinner').classList.add('display-none');
};