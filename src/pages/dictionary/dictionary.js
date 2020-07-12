import './dictionary.css';
import {
  getAllDeleteWords,
  getAllHardWords,
  getAllStudyWords,
} from '../../services/userWordService';
import { renderAllCards } from './renderAllCards';
import { getUserSettings } from '../../services/settingsService';
import { getUserID } from '../../services/authService';
import { getToken } from '../../services/token';
import { errorWindow } from '../../components/main/errorWindow/errorWindow';
import { showSpinner, hideSpinner, renderSpinner } from './spinner';
import { header } from '../../components/main/header/header';
import { footer } from '../../components/main/footer/footer';

const body = document.querySelector('body');
header();
const main = document.createElement('main');
const userId = getUserID();
const token = getToken();
if (!userId || !token) {
  errorWindow();
}
const typeWords = [
  {
    name: 'to_study',
    textContent: 'Изучаемые слова',
    selected: 'true',
    dataLoader: 'getAllStudyWords',
  },
  {
    name: 'hard',
    textContent: 'Сложные слова',
    selected: 'false',
    dataLoader: 'getAllHardWords',
  },
  {
    name: 'delete',
    textContent: 'Удаленные слова',
    selected: 'false',
    dataLoader: 'getAllDeleteWords',
  },
];

function renderNavTabs() {
  const nav = document.createElement('div');
  nav.classList.add('nav', 'flex-column', 'nav-pills');
  nav.setAttribute('id', 'v-pills-tab');
  nav.setAttribute('role', 'tablist');
  nav.setAttribute('aria-orientation', 'vertical');
  typeWords.forEach((elem) => {
    nav.innerHTML += `<a class="nav-link" id="v-pills-${elem.name}-tab" data-toggle="pill" href="#v-pills-${elem.name}" role="tab" data-content =${elem.dataLoader} aria-controls="v-pills-${elem.name}" aria-selected=${elem.selected}>${elem.textContent}</a>`;
  });
  nav.querySelector('.nav-link:first-child').classList.add('active');
  return nav;
}

function renderTabContent() {
  const tab = document.createElement('div');
  tab.classList.add('tab-content');
  tab.setAttribute('id', 'v-pills-tabContent');
  typeWords.forEach((elem) => {
    tab.innerHTML += `<div class="tab-pane fade" id="v-pills-${elem.name}" role="tabpanel"  aria-labelledby="v-pills-${elem.name}-tab"></div>`;
  });
  tab.querySelector('.tab-pane:first-child').classList.add('show', 'active');
  return tab;
}
main.innerHTML = `
<div class="row">
  <div class="col-12 col-sm-3 navigation">
  </div>
  <div class="col-12 col-sm-9 words-content">
  </div></div>
  
`;
renderSpinner(main);
const col1 = main.querySelector('.navigation');
col1.appendChild(renderNavTabs());
const col2 = main.querySelector('.words-content');
col2.appendChild(renderTabContent());

const loaders = {
  getAllStudyWords,
  getAllHardWords,
  getAllDeleteWords,
};

async function initContent(user, name) {
  showSpinner(main);
  const content = await loaders[name](user);
  const activeTab = document.querySelector('.show');
  const allSettings = await getUserSettings({ userId });
  const settings = allSettings.optional;
  const wordsContent = await renderAllCards(content, settings);
  activeTab.innerHTML = '';
  activeTab.appendChild(wordsContent);
  hideSpinner(main);
}

document.addEventListener('DOMContentLoaded', () => {
  initContent({ userId }, 'getAllStudyWords');
  const navTabs = main.querySelectorAll('.nav-link');
  navTabs.forEach((elem) => elem.addEventListener('click', () => initContent({ userId }, elem.dataset.content)));
  body.appendChild(main);
  footer();
});
